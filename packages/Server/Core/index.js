var express = require('express');
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var cors = require('cors');
var createError = require('http-errors');
var methodOverride = require('method-override');
var colors = require('colors');
var compression = require('compression');

var rotas = require('../Api');
var log = require('../Logs');
var errors = require('../Api/Middleware/errors');
var app = express();
var helmet = require('helmet');

app.use(
  fileUpload(
    {
      createParentPath: true,
    }
  )
);

app.use(
  bodyParser.json(
    {
      limit:
        '150mb',
    }
  )
);
app.use(
  bodyParser.urlencoded(
    {
      limit:
        '150mb',
      extended: true,
    }
  )
);
app.use(
  compression()
);

app.use(
  methodOverride()
);
app.use(
  errors.log
);
app.use(
  errors.client
);
app.use(
  errors.handler
);

app.use(
  cors({
    origin:
      '*',
  })
);

app.use(
  '/v1',
  rotas
);

app.use(
  helmet()
);

app.use(
  function (
    x,
    y,
    next
  ) {
    log.error(
      createError(
        404
      ).toString()
    );
    next(
      createError(
        404
      )
    );
  }
);

require('dotenv').config(
  {
    path:
      process
        .env
        .NODE_ENV ===
      'development '
        ? console.log(
            'Modo: Development'
          )
        : console.log(
            'Modo: Production'
          ),
  }
);

if (
  app.get(
    'env'
  ) ===
  'development'
) {
  app.use(
    (
      err,
      req,
      res
    ) => {
      log.error(
        err.toString()
      );
      console.error(
        colors.red(
          err.stack
        )
      );
      res.status(
        err.status ||
          500
      );
      res.render(
        'error',
        {
          message:
            err.message,
          error: err,
        }
      );
    }
  );
}

module.exports = app;
