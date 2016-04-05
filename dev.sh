
tmux new-session -d -s orgbox

## Whiteboard session

# Org-mode window
tmux select-window -t orgbox:0
tmux rename-window 'org'

# Build window
tmux new-window -n build -t orgbox
tmux send-keys 'clear' 'Enter'
tmux send-keys 'npm start'
tmux send-keys 'Enter'

# Source window
tmux new-window -n src -t orgbox
tmux send-keys 'cd src'
tmux send-keys 'clear' 'Enter'
tmux send-keys 'vim'
tmux send-keys 'Enter'

# Directory window
tmux new-window -n dir -t orgbox
tmux send-keys 'clear' 'Enter'
tmux send-keys 'Enter'


tmux attach-session -t orgbox
