import json
import sys
import time

def ret(data = {}):
    print(json.dumps(data), end='')

def ret_err(num, title, msg):
    ret({'error': True, 'number': num, 'title': title, 'message': msg})

try:
    import pyautogui
except ImportError:
    ret_err(1, 'ImportError', 'Could not import pyautogui')
    exit()

running = True
ongoing = False

if len(sys.argv) == 2:
    if sys.argv[1] == 'start':
        ongoing = True

while running:
    if not ongoing: running = False

    try:
        args = sys.argv if not running else (sys.argv[0] + " " + input()).split(' ')
    except:
        continue

    with open('cache.txt', 'a') as f:
        f.write(time.ctime() + " ".join(args) + "\n")

    if len(args) == 2:
        if args[1] == 'stop': break
    
    elif len(args) == 3:
        try:
            if args[1] == 'keydown': pyautogui.keyDown(args[2])
            elif args[1] == 'keyup': pyautogui.keyUp(args[2])
            elif args[1] == 'press': pyautogui.press(args[2])
            
            ret()
        except:
            ret_err(1, 'PyAutoGUIError', 'Something went wrong while using PyAutoGUI')