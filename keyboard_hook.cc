#include <napi.h>
#include <windows.h>
#include <thread>

HHOOK keyboardHook = NULL;
HHOOK mouseHook = NULL;

Napi::ThreadSafeFunction tsfn;
std::thread hookThread;
bool running = false;

LRESULT CALLBACK KeyboardProc(int code, WPARAM wParam, LPARAM lParam) {
    if (code >= 0) {
        KBDLLHOOKSTRUCT* kbd = (KBDLLHOOKSTRUCT*)lParam;
        int vkCode = kbd->vkCode;

        int eventType = 0;

        switch (wParam) {
            case WM_KEYDOWN:
            case WM_SYSKEYDOWN:
                eventType = 1; // key down
                break;

            case WM_KEYUP:
            case WM_SYSKEYUP:
                eventType = 2; // key up
                break;
        }

        if (eventType != 0) {
            tsfn.BlockingCall([eventType, vkCode](Napi::Env env, Napi::Function jsCallback) {
                jsCallback.Call({
                    Napi::String::New(env, "key"),
                    Napi::Number::New(env, eventType),
                    Napi::Number::New(env, vkCode),
                    Napi::Number::New(env, 0) // 键盘没有 x,y
                });
            });
        }
    }
    return CallNextHookEx(NULL, code, wParam, lParam);
}

LRESULT CALLBACK MouseProc(int code, WPARAM wParam, LPARAM lParam) {
    if (code >= 0) {
        MSLLHOOKSTRUCT* ms = (MSLLHOOKSTRUCT*)lParam;

        int eventType = 0;

        switch (wParam) {
            case WM_MOUSEMOVE: eventType = 1; break;
            case WM_LBUTTONDOWN: eventType = 2; break;
            case WM_LBUTTONUP: eventType = 3; break;
            case WM_RBUTTONDOWN: eventType = 4; break;
            case WM_RBUTTONUP: eventType = 5; break;
            case WM_MOUSEWHEEL: eventType = 6; break;
        }

        if (eventType != 0) {
            int x = ms->pt.x;
            int y = ms->pt.y;

            tsfn.BlockingCall([eventType, x, y](Napi::Env env, Napi::Function jsCallback) {
                jsCallback.Call({
                    Napi::String::New(env, "mouse"),
                    Napi::Number::New(env, eventType),
                    Napi::Number::New(env, x),
                    Napi::Number::New(env, y)
                });
            });
        }
    }
    return CallNextHookEx(NULL, code, wParam, lParam);
}

void HookThread() {
    keyboardHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, NULL, 0);
    mouseHook = SetWindowsHookEx(WH_MOUSE_LL, MouseProc, NULL, 0);

    MSG msg;
    while (running && GetMessage(&msg, NULL, 0, 0)) {}

    UnhookWindowsHookEx(keyboardHook);
    UnhookWindowsHookEx(mouseHook);
}

Napi::Value StartHook(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Function cb = info[0].As<Napi::Function>();

    tsfn = Napi::ThreadSafeFunction::New(env, cb, "inputHook", 0, 1);

    running = true;
    hookThread = std::thread(HookThread);

    return env.Null();
}

Napi::Value StopHook(const Napi::CallbackInfo& info) {
    running = false;
    PostThreadMessage(GetThreadId(hookThread.native_handle()), WM_QUIT, 0, 0);
    if (hookThread.joinable()) hookThread.join();
    return info.Env().Null();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("start", Napi::Function::New(env, StartHook));
    exports.Set("stop", Napi::Function::New(env, StopHook));
    return exports;
}

NODE_API_MODULE(input_hook, Init)
