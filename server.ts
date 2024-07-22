import 'zone.js/node';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './src/app/app.server.module';
import { join } from 'path';
import { readFileSync } from 'fs';
import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env['PORT'] || 4000;

const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
  })
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  })
);

app.get('*', (req: Request, res: Response) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
