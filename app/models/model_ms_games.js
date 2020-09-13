const mysql = require('../module/mysql_connector')

module.exports = {
    getById: async function(games_id) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT * FROM ms_games " +
                "WHERE id=? "
            var data_input = [games_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getGames: async function() {
        try {
            await mysql.connectAsync()
            var sql = "SELECT mg.id, mg.name, image, description, link, mr.name as genre_name, is_active, mg.created, mg.updated FROM ms_games mg JOIN ms_genre mr ON mg.id_genre = mr.id"
            var [result, cache] = await mysql.queryAsync(sql)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    getCountSaved: async function(games_id) {
        try {
            await mysql.connectAsync()
            var sql = "SELECT COUNT(ta.id) as saved_account FROM ms_games mg JOIN tr_user_account ta ON ta.id_games = mg.id WHERE mg.id = ?"
            var data_input = [games_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result[0], null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },


    addGames: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "INSERT INTO ms_games (name, image, description, link, id_genre, is_active) " +
                "VALUES (" +
                "?, " +
                "?, " +
                "?, " +
                "?, " +
                "?, " +
                "1 " +
                ")"
            var data_input = [data.games_name, data.image, data.description, data.link, data.id_genre]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    updateGames: async function(data) {
        try {
            await mysql.connectAsync()
            var sql = "UPDATE ms_games SET " +
                "name=?, " +
                "image=?, " +
                "description=?, " +
                "link=?, " +
                "id_genre=?, " +
                "updated=NOW() " +
                "WHERE id=? "
            var data_input = [data.games_name, data.image, data.description, data.link, data.id_genre, data.games_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
                // logs.model_log({
                //     name_function: "updateGroup",
                //     data: data,
                //     sql: sql
                // })
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

    deleteGames: async function(group_id) {
        try {
            var sql = "DELETE FROM ms_games WHERE id=? "
            var data_input = [group_id]
            var [result, cache] = await mysql.executeAsync(sql, data_input)
            await mysql.endPool()
            return [result, null]
        } catch (error) {
            console.log(error)
            await mysql.endPool()
            return [null, error]
        }
    },

}