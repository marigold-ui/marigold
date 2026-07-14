// Shell stubs for tab completion. Each delegates to `marigold __complete --`
// and feeds the newline-delimited output back to the shell. Keep these stubs
// minimal — all suggestion logic lives in commands/completion.ts so we can
// evolve it without forcing users to re-install their completion file.

export const BASH_SCRIPT = `# bash completion for marigold
_marigold_complete() {
  # Slice COMP_WORDS BEFORE changing IFS — bash collapses array slices into a
  # single string when IFS contains only newline, so the slice must happen
  # under the default IFS.
  local words
  words=("\${COMP_WORDS[@]:1:COMP_CWORD}")
  # Set IFS to newline only for the command substitution so component names
  # with spaces (none today, but defensively) don't get split on spaces.
  local IFS=$'\\n'
  COMPREPLY=( $(marigold __complete -- "\${words[@]}" 2>/dev/null) )
}
# -o default: when _marigold_complete produces no matches (e.g. \`validate\`'s
# file positional, which this function does not resolve), fall back to
# bash's own default completion (filenames/directories) instead of showing
# nothing.
complete -o default -F _marigold_complete marigold
`;

export const ZSH_SCRIPT = `# zsh completion for marigold
_marigold() {
  # \`words\` and \`CURRENT\` are provided by zsh's completion system; words[1]
  # is "marigold". Don't declare a local named \`words\` — that would shadow the
  # outer array and the slice below would silently see an empty list.
  local -a comp_words
  comp_words=("\${(@)words[2,$CURRENT]}")
  local -a completions
  completions=("\${(@f)$(marigold __complete -- "\${comp_words[@]}" 2>/dev/null)}")
  # No matches from our own completer (e.g. \`validate\`'s file positional,
  # which it does not resolve) — fall back to zsh's file completion instead
  # of showing nothing.
  if (( \${#completions} == 0 )); then
    _files
  else
    compadd -- "\${completions[@]}"
  fi
}
compdef _marigold marigold
`;

export const FISH_SCRIPT = `# fish completion for marigold
function __marigold_complete
  set -l tokens (commandline -opc) (commandline -ct)
  # tokens[1] is "marigold"; pass the rest.
  if test (count $tokens) -ge 2
    marigold __complete -- $tokens[2..] 2>/dev/null
  else
    marigold __complete -- "" 2>/dev/null
  end
end
# -f (no file completion) keeps other subcommands' suggestions (component
# names, subcommand names, ...) free of filesystem noise. \`validate\`'s sole
# positional is a file path, so it gets its own registration WITHOUT -f,
# letting fish's native filename completion apply whenever
# __marigold_complete has nothing to suggest for it.
complete -c marigold -n 'not __fish_seen_subcommand_from validate' -f -a '(__marigold_complete)'
complete -c marigold -n '__fish_seen_subcommand_from validate' -a '(__marigold_complete)'
`;
