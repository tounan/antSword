/**
 * 文件管理模板
 */

module.exports = (arg1, arg2, arg3) => ({
  dir: {
    _: `cd #{path} && find . -maxdepth 1 \\( -type d -printf "%f/\\t%AY-%Am-%Ad %AH:%AM:%AS\\t%s\t%.4m\\n" \\) , \\( -not -type d -printf "%f\\t%AY-%Am-%Ad %AH:%AM:%AS\\t%s\\t%.4m\\n" \\)||echo -ne "ERROR:// Path not found OR no Permission";`
  },

  delete: {
    _: `rm -rf #{path} && echo -ne 1||echo -ne 0;`,
  },

  create_file: {
    _: `command_exists() { command -v "$@" > /dev/null 2>&1; };
    ACONTENT="#{buffer::content}";
    ADSTPATH="#{path}";
    if command_exists xxd; then 
      echo -ne $ACONTENT|xxd -r -p > $ADSTPATH && echo -ne 1||echo -ne 0; 
    elif command_exists python3; then 
      echo -ne $ACONTENT|python3 -c "import sys, binascii; sys.stdout.buffer.write(binascii.unhexlify(input().strip()))">$ADSTPATH && echo -ne 1||echo -ne 0; 
    else 
      echo -ne $ACONTENT|sed 's/\\([0-9A-F]\\{2\}\\)/\\\\\\\\\\\\x\\1/gI'|xargs printf>$ADSTPATH && echo -ne 1||echo -ne 0; 
    fi;`.replace(/\n\s+/g, '')
  },

  read_file: {
    _: `cat #{path}||echo -ne "ERROR:// File not found or no Permission";`
  },

  copy: {
    _: `cp -af #{path} #{target} && echo -ne 1||echo -ne 0;`
  },

  download_file: {
    _: `cat #{path}||echo "ERROR:// File not found or no Permission";`
  },

  upload_file: {
    _: `command_exists() { command -v "$@" > /dev/null 2>&1; };
    ACONTENT="#{buffer::content}";
    ADSTPATH="#{path}";
    if command_exists xxd; then 
      echo -ne $ACONTENT|xxd -r -p >> $ADSTPATH && echo -ne 1||echo -ne 0; 
    elif command_exists python3; then 
      echo -ne $ACONTENT|python3 -c "import sys, binascii; sys.stdout.buffer.write(binascii.unhexlify(input().strip()))">>$ADSTPATH && echo -ne 1||echo -ne 0; 
    else 
      echo -ne $ACONTENT|sed 's/\\([0-9A-F]\\{2\}\\)/\\\\\\\\\\\\x\\1/gI'|xargs printf>>$ADSTPATH && echo -ne 1||echo -ne 0; 
    fi;`.replace(/\n\s+/g, '')
  },

  rename: {
    _: `mv #{path} #{name} && echo -ne 1||echo -ne 0;`
  },

  retime: {
    _: `touch -d "#{time}" #{path} && echo -ne 1||echo -ne 0;`
  },

  chmod: {
    _: `chmod #{mode} #{path} && echo -ne 1||echo -ne 0;`
  },

  mkdir: {
    _: `mkdir -p #{path} && echo -ne 1||echo -ne 0;`,
  },

  wget: {
    _: `command_exists() { command -v "$@" > /dev/null 2>&1; };
      ascurl=''
      if command_exists curl; then 
        ascurl='curl -ksSL -o';
      elif command_exists wget; then 
        ascurl='wget --no-check-certificate -qO';
      elif command_exists busybox && busybox --list-modules | grep -q wget; then 
        ascurl='busybox wget --no-check-certificate -qO'
      fi;
      $ascurl #{path} #{url} && echo -ne 1||echo -ne 0;
    `.replace(/\n\s+/g, '')
  }
})