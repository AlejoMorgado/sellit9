import 'zone.js/node';
import { join } from 'path';
import { readFileSync } from 'fs';
import express, { Request, Response } from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './app/app.server.module';

const app = express();
const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

// Angular Universal engine setup
app.engine(
  'html',
  ngExpressEngine({
    bootstrap: AppServerModule,
  })
);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Serve static files from the dist/browser directory
app.get(
  '*.*',
  express.static(DIST_FOLDER, {
    maxAge: '1y',
  })
);

// All other routes should use Angular Universal
app.get('*', (req: Request, res: Response) => {
  res.render('index', { req });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
