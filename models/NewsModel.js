const mysql = require('mysql');

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',      // 数据库地址
    user: 'root',           // 数据库用户名
    password: '111111',   // 数据库密码
    database: 'demo',       // 数据库名称
    connectionLimit: 10,    // 最大连接数
});

// 新闻模型
const NewsModel = {
    /**
     * 插入新闻
     * @param {Object} news - 新闻对象
     * @returns {Promise} - 返回插入结果
     */
    create(news) {
        return new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO news (title, content, category, cover, isPublish, editTime)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
            const params = [
                news.title,
                news.content,
                news.category,
                news.cover,
                news.isPublish,
                news.editTime
            ];

            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error("插入新闻失败:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    /**
     * 查询新闻
     * @param {Object} conditions - 查询条件
     * @returns {Promise} - 返回查询结果
     */
    find(conditions = {}) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM news';
            const params = [];

            if (Object.keys(conditions).length > 0) {
                const whereClause = Object.keys(conditions)
                    .map((key) => `${key} = ?`)
                    .join(' AND ');
                sql += ` WHERE ${whereClause}`;
                Object.values(conditions).forEach((value) => params.push(value));
            }
            console.log("sql:" , sql ,"params:" , params)
            pool.query(sql, params, (err, results) => {
                if (err) {
                    console.error("查询新闻失败:", err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    /**
     * 更新新闻
     * @param {Object} conditions - 更新条件
     * @param {Object} updates - 更新内容
     * @returns {Promise} - 返回更新结果
     */
    update(conditions, updates) {
        return new Promise((resolve, reject) => {
            const setClause = Object.keys(updates)
                .map((key) => `${key} = ?`)
                .join(', ');
            const whereClause = Object.keys(conditions)
                .map((key) => `${key} = ?`)
                .join(' AND ');
            const sql = `UPDATE news SET ${setClause} WHERE ${whereClause}`;
            const params = [...Object.values(updates), ...Object.values(conditions)];

            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error("更新新闻失败:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    /**
     * 删除新闻
     * @param {Object} conditions - 删除条件
     * @returns {Promise} - 返回删除结果
     */
    delete(conditions) {
        return new Promise((resolve, reject) => {
            const whereClause = Object.keys(conditions)
                .map((key) => `${key} = ?`)
                .join(' AND ');
            const sql = `DELETE FROM news WHERE ${whereClause}`;
            const params = Object.values(conditions);

            // console.log("sql:" , sql ,"params:" , params)

            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error("删除新闻失败:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

module.exports = NewsModel;