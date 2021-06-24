/**
 * 数据库管理模板::mysql
 * i 数据分隔符号 => \t|\t
 */

module.exports = (arg1, arg2, arg3, arg4, arg5, arg6) => ({
  // 显示所有数据库
  show_databases: {
    _: `mysql --raw -N -B -h#{host} -u#{user} -p#{passwd} -e "show databases;"|while read DBRES; do echo -n "$DBRES\\t"; done;`,
  },
  // 显示数据库所有表
  show_tables: {
    _: `mysql --raw -N -B -h#{host} -u#{user} -p#{passwd} -D#{db} -e "show tables;"|while read DBRES; do echo -n "$DBRES\\t"; done;`
  },
  // 显示表字段
  show_columns: {
    _: `mysql --raw -N -B -h#{host} -u#{user} -p#{passwd} -D#{db} -e "select concat(column_name,0x2028,column_type,0x29) from information_schema.COLUMNS where TABLE_SCHEMA=0x#{buffer::db} and TABLE_NAME=0x#{buffer::table};"|while read DBRES; do echo -n "$DBRES\\t"; done;`
  },
  // 执行SQL语句
  query: {
    _: `
    mysql --xml --raw -B -h#{host} -u#{user} -p#{passwd} -D#{db} <<'EOF'
#{sql};
SELECT ROW_COUNT() as "Affected Rows";
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