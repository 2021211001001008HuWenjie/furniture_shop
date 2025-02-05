const mysql = require('mysql'); // 引入 mysql 库

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',      // 数据库地址
    user: 'root',           // 数据库用户名
    password: '111111',   // 数据库密码
    database: 'demo',       // 数据库名称
    connectionLimit: 10,    // 最大连接数
});

// 用户模型
const UserModel = {
    /**
     * 插入用户
     * @param {Object} user - 用户对象
     * @returns {Promise} - 返回插入结果
     */
    create(user) {
        return new Promise((resolve, reject) => {
            const { username, password, gender, introduction, avatar, role } = user;
            const sql = `
        INSERT INTO users (username, password, gender, introduction, avatar, role)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
            pool.query(sql, [username, password, gender, introduction, avatar, role], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    /**
     * 查询用户
     * @param {Object} conditions - 查询条件
     * @returns {Promise} - 返回查询结果
     * @fields 参数，你可以动态选择需要查询的字段
     * orderBy = '' 排序
     * limit = 0, offset = 0 分页
     */
    find(conditions = {}, fields = [], orderBy = '', limit = 0, offset = 0) {
        return new Promise((resolve, reject) => {
            const selectedFields = fields.length > 0 ? fields.join(', ') : '*';
            let sql = `SELECT ${selectedFields} FROM users`;

            const params = [];
            if (Object.keys(conditions).length > 0) {
                const whereClause = Object.keys(conditions)
                    .map((key) => `${key} = ?`)
                    .join(' AND ');
                sql += ` WHERE ${whereClause}`;
                Object.values(conditions).forEach((value) => params.push(value));
            }

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
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    /**
     * 更新用户
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
            const sql = `UPDATE users SET ${setClause} WHERE ${whereClause}`;
            const params = [...Object.values(updates), ...Object.values(conditions)];
            pool.query(sql, params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    /**
     * 删除用户
     * @param {Object} conditions - 删除条件
     * @returns {Promise} - 返回删除结果
     */
    delete(conditions) {
        return new Promise((resolve, reject) => {
            const whereClause = Object.keys(conditions)
                .map((key) => `${key} = ?`)
                .join(' AND ');
            const sql = `DELETE FROM users WHERE ${whereClause}`;
            const params = Object.values(conditions);
            pool.query(sql, params, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },


};

// 导出用户模型
module.exports = UserModel;