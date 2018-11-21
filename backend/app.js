const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');

const observations = require('./models/observation');

app.use(bodyparser({
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  }
}));

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);

  // allow access from outside
  ctx.set('Access-Control-Allow-Origin', '*');
});

// response

app.use(async ctx => {
  if (ctx.request.method === 'POST') {
    console.log(ctx.request.body);

    if (ctx.request.body.light) {
      ctx.request.body.open = ctx.request.body.light > 2500;
    }

    if (ctx.request.body.open === undefined) {
      ctx.status = 400;
      ctx.body = 'missing post param "open"';
      return;
    }

    const observation = await observations.create({ open: ctx.request.body.open });
    
    ctx.status = 201;
  }

  const all = await observations.findAll();
  const allJSON = await Promise.all(all.map(it => it.toJSON()));

  ctx.body = allJSON;
});

module.exports = app;