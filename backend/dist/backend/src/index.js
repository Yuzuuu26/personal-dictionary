import express from 'express';
import routes from './routes/main.route.js';
import morgan from 'morgan';
import cors from 'cors';
const app = express();
const PORT = Number(process.env.PORT);
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5500' }));
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use('/', routes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
/**
 * DICIONARY/WORD
 * GET /list
 * GET /list/all/:id
 * POST /list/new
 * DELETE /list/:id
 *
 * TAGS/CATEGORIES
 * GET /tags
 * GET /tags/:id
 * POST /tags/new
 * DELETE /tags/:id
 */
/**
 * CREATE TABLE words (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      categories JSONB,
      definitions JSONB NOT NULL
  )

INSERT INTO words (name, categories, definitions)
VALUES (
  'function',
  '[
    {"category": "programming", "id": 1}
  ]'::jsonb,
  '[
    {
      "definition": "A reusable block of code that performs a specific task.",
      "source": "https://developer.mozilla.org"
    },
    {
      "definition": "A procedure that accepts inputs and optionally returns a value.",
      "source": "https://en.wikipedia.org"
    }
  ]'::jsonb
),
(
  'array',
  '[
    {"category": "data structure", "id": 2},
    {"category": "programming", "id": 1}
  ]'::jsonb,
  '[
    {
      "definition": "A collection of elements stored in a contiguous sequence of memory.",
      "source": "https://en.wikipedia.org"
    },
    {
      "definition": "A data structure used to store multiple values under a single variable name.",
      "source": "https://developer.mozilla.org"
    }
  ]'::jsonb
);
 */ 
//# sourceMappingURL=index.js.map