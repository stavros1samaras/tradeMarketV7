/**
 * @swagger
 * tags:
 *   - name: quote
 *     description: Stock quote endpoints
 */

/**
 * @swagger
 * /api/quote/{symbol}:
 *   get:
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
