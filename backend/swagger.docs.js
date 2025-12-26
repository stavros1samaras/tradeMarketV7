/**
 * @swagger
 * tags:
 *   - name: Quote
 *     description: Stock quote endpoints
 *   - name: Balance
 *     description: Balance sheet data
 *   - name: Search
 *     description: Search endpoints
 *   - name: Recommendations
 *     description: Stock recommendations
 *   - name: Summary
 *     description: Quote summary data
 *   - name: Options
 *     description: Options data
 *   - name: Insights
 *     description: Market insights
 *   - name: Historical
 *     description: Historical stock data
 *   - name: Financials
 *     description: Financial reports
 */

/**
 * @swagger
 * /api/quote/{symbol}:
 *   get:
 *     tags: [Quote]
 *     summary: Get stock quote
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         example: AAPL
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/balance-sheet/{symbol}:
 *   get:
 *     tags: [Balance]
 *     summary: Get balance sheet data
 *     description: Returns balance sheet data for a given symbol and period.
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         description: Stock ticker symbol
 *         example: AAPL
 *
 *       - name: period1
 *         in: query
 *         required: true
 *         description: Start date (YYYY-MM-DD)
 *         example: 2024-01-01
 *
 *       - name: period2
 *         in: query
 *         required: true
 *         description: End date (YYYY-MM-DD)
 *         example: 2025-01-01
 *
 *       - name: type
 *         in: query
 *         required: true
 *         description: Period type
 *         schema:
 *           type: string
 *           enum: [annual, quarterly]
 *         example: quarterly
 *
 *     responses:
 *       200:
 *         description: OK
 */


/**
 * @swagger
 * /api/search/{symbol}:
 *   get:
 *     tags: [Search]
 *     summary: Search for stocks
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         example: AAPL
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/recommendations/{symbol}:
 *   get:
 *     tags: [Recommendations]
 *     summary: Get stock recommendations
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         example: AAPL
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/quote-summary/{symbol}:
 *   get:
 *     tags: [Summary]
 *     summary: Get quote summary
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         example: AAPL
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/options/{symbol}:
 *   get:
 *     tags: [Options]
 *     summary: Get stock options
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         example: AAPL
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/insights/{symbol}:
 *   get:
 *     tags: [Insights]
 *     summary: Get stock insights
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         example: AAPL
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /api/historical/{symbol}:
 *   get:
 *     summary: Get historical data
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: AAPL
 *
 *       - name: period1
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: 2024-01-01
 *
 *       - name: period2
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: 2025-01-01
 *
 *     responses:
 *       200:
 *         description: OK
 */



/**
 * @swagger
 * /api/financials/{symbol}:
 *   get:
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: AAPL
 *
 *       - name: period1
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: 2024-01-01
 *
 *       - name: period2
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: 2025-01-01
 *
 *       - name: type
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: quarterly
 *
 *     responses:
 *       200:
 *         description: OK
 */


/**
 * @swagger
 * /api/cash-flow/{symbol}:
 *   get:
 *     summary: Get cash flow data
 *     parameters:
 *       - name: symbol
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: AAPL
 *
 *       - name: period1
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: 2024-01-01
 *
 *       - name: period2
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: 2025-01-01
 *
 *       - name: type
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         example: quarterly
 *
 *     responses:
 *       200:
 *         description: OK
 */

