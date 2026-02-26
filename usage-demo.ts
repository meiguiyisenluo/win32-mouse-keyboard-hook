import hook from ".";
import { Win32KeyCode } from ".";

hook.start();
hook.on('key', (eventType, keyCode) => {
  console.log(keyCode === Win32KeyCode.A);
});