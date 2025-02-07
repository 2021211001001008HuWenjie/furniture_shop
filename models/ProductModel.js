const mysql = require('mysql');

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',      // 数据库地址
    user: 'root',           // 数据库用户名
    password: '111111',   // 数据库密码
    database: 'demo',       // 数据库名称
    connectionLimit: 10,    // 最大连接数
});

// 产品模型
const ProductModel = {
    /**
     * 插入产品
     * @param {Object} product - 产品对象
     * @returns {Promise} - 返回插入结果
     */
    create(product) {
        return new Promise((resolve, reject) => {
            const sql = `
        INSERT INTO products (name, price, info, introduction, state, stock_num, store, category_id, sales_volume, visit_volume, selling_price, tags, img, editTime)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
            const params = [
                product.name,
                product.price,
                product.info,
                product.introduction,
                product.state,
                product.stock_num,
                product.store,
                product.category_id,
                product.sales_volume,
                product.visit_volume,
                product.selling_price,
                product.tags,
                product.img,
                product.editTime
            ];

            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error("插入产品失败:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    /**
     * 查询产品
     * @param {Object} conditions - 查询条件
     * @returns {Promise} - 返回查询结果
     */
    find(conditions = {}, fields = [], orderBy = '', limit = 0, offset = 0) {
        return new Promise((resolve, reject) => {
            const selectedFields = fields.length > 0 ? fields.join(', ') : '*';
            let sql = `SELECT ${selectedFields} FROM products`;

            const params = [];
            if (Object.keys(conditions).length > 0) {
                const whereClause = Object.keys(conditions)
                    .map((key) => `${key} = ?`)
                    .join(' AND ');
                sql += ` WHERE ${whereClause}`;
                Object.values(conditions).forEach((value) => params.push(value));
            }
            console.log("sql",sql,"params",params)
            if (orderBy) {
                sql += ` ORDER BY ${orderBy}`;
            }

            if (limit > 0) {
                sql += ` LIMIT ?`;
                params.push(limit);
            }

            if (offset > 0) {
                sql += ` OFFSET ?`;
                params.push(offset);
            }

            pool.query(sql, params, (err, results) => {
                if (err) {
                    console.error("查询产品失败:", err);
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    /**
     * 更新产品
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
            const sql = `UPDATE products SET ${setClause} WHERE ${whereClause}`;
            const params = [...Object.values(updates), ...Object.values(conditions)];


            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error("更新产品失败:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    /**
     * 删除产品
     * @param {Object} conditions - 删除条件
     * @returns {Promise} - 返回删除结果
     */
    delete(conditions) {
        return new Promise((resolve, reject) => {
            const whereClause = Object.keys(conditions)
                .map((key) => `${key} = ?`)
                .join(' AND ');
            const sql = `DELETE FROM products WHERE ${whereClause}`;
            const params = Object.values(conditions);

            pool.query(sql, params, (err, result) => {
                if (err) {
                    console.error("删除产品失败:", err);
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
};

module.exports = ProductModel;