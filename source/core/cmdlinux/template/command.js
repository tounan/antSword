/**
 * 虚拟终端命令执行
 */

module.exports = (arg1, arg2, arg3) => ({
  exec: {
    _: `ENVSTR=$(echo #{buffer::env}|xxd -r -p);
    while [ $ENVSTR ]; do 
      ASLINE=\${ENVSTR%%"|||asline|||"*};
      ENVSTR=\${ENVSTR#*"|||asline|||"};
      export \${ASLINE%%"|||askey|||"*}=\${ASLINE#*"|||askey|||"};
    done;
    #{bin} -c '#{cmd}';`.replace(/\n\s+/g, ''),
  },
  listcmd: {
    _: `CMDLIST="#{binarr}";
    OLD_IFS=$IFS;
    IFS=",";
    for v in $CMDLIST; do 
      if [ -f $v ]; then echo "$v\\t1"; else echo "$v\\t0"; fi;
    done;`.replace(/\n\s+/g, '')
  }
})