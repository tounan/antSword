/**
 * 数据库管理模板:: sqlite3
 * i 数据分隔符号 => \\t|\\t
 */

module.exports = (arg1, arg2, arg3, arg4, arg5, arg6) => ({
  // 显示所有数据库
  show_databases: {
    _: `SQLITEFILE="#{host}";
if [ -f $SQLITEFILE ]; then echo -n "main\t"; else echo "ERROR:// $SQLITEFILE not found."; fi;
    `,
    [arg1]: '#{host}',
    [arg2]: '#{user}',
    [arg3]: '#{passwd}'
  },
  // 显示数据库所有表
  show_tables: {
    _: `SQLITEFILE="#{host}";
if [ ! -f $SQLITEFILE ]; then echo "ERROR:// $SQLITEFILE not found."; exit; fi;
sqlite3  $SQLITEFILE <<EOF
.headers off
.separator "" "\\t"
select tbl_name from sqlite_master where type='table' order by tbl_name;
EOF
    `,
    [arg1]: '#{host}',
    [arg2]: '#{user}',
    [arg3]: '#{passwd}',
    [arg4]: '#{db}'
  },
  // 显示表字段
  show_columns: {
    _: `SQLITEFILE="#{host}";
if [ ! -f $SQLITEFILE ]; then echo "ERROR:// $SQLITEFILE not found."; exit; fi;
sqlite3  $SQLITEFILE <<EOF
.separator "" "\\t"
.headers off
select name," (",type,")" from pragma_table_info('#{table}');
EOF
    `,
    [arg1]: '#{host}',
    [arg2]: '#{user}',
    [arg3]: '#{passwd}',
    [arg4]: '#{db}',
    [arg5]: '#{table}'
  },
  // 执行SQL语句
  query: {
    _: `SQLITEFILE="#{host}";
if [ ! -f $SQLITEFILE ]; then echo "ERROR:// $SQLITEFILE not found."; exit; fi;
sqlite3  $SQLITEFILE <<EOF
.separator "\\t|\\t" "\\t|\\t\\r\\n"
.headers on
#{sql}
EOF
    `,
    [arg1]: '#{host}',
    [arg2]: '#{user}',
    [arg3]: '#{passwd}',
    [arg4]: '#{db}',
    [arg5]: '#{base64::sql}',
    [arg6]: '#{encode}'
  }
})