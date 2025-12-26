/**
 * @swagger
 * tags:
 *   - name: General
 *     description: General information
 *   - name: Fundamentals
 *     description: Financial statements (balance sheet, cash flow, financials)
 *   - name: Enhancement
 *     description: Stock recommendations
 */

/** INSIGHTS - SWAGGER UI
 * @swagger
 * /api/insights/{symbol}:
 *   get:
 *     tags: [General]
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

/** QUOTE - SWAGGER UI
 * @swagger
 * /api/quote/{symbol}:
 *   get:
 *     tags: [General]
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

/** QUOTE SUMMARY - SWAGGER UI
 * @swagger
 * /api/quote-summary/{symbol}:
 *   get:
 *     tags: [General]
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

/** BALANCE SHEET - SWAGGER UI
 * @swagger
 * /api/balance-sheet/{symbol}:
 *   get:
 *     tags: [Fundamentals]
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

/** FINANCIALS - SWAGGER UI
 * @swagger
 * /api/financials/{symbol}:
 *   get:
 *     tags: [Fundamentals]
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

/** CASH FLOW - SWAGGER UI
 * @swagger
 * /api/cash-flow/{symbol}:
 *   get:
 *     tags: [Fundamentals]
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

/** RECOMMENDATIONS - SWAGGER UI
 * @swagger
 * /api/recommendations/{symbol}:
 *   get:
 *     tags: [Enhancement]
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

/** OPTIONS - SWAGGER UI
 * @swagger
 * /api/options/{symbol}:
 *   get:
 *     tags: [Enhancement]
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

/** HISTORICAL - SWAGGER UI
 * @swagger
 * /api/historical/{symbol}:
 *   get:
 *     tags: [Enhancement]
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

/** SEARCH - SWAGGER UI
 * @swagger
 * /api/search/{symbol}:
 *   get:
 *     tags: [Enhancement]
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
