# Project ProGuard / R8 Rules for Psalms & Hymns Offline

# Preserve line numbers for stack traces in crash logs
-keepattributes SourceFile,LineNumberTable

# Capacitor core and plugin interfaces
-keep public class com.getcapacitor.** { *; }
-keep public class * extends com.getcapacitor.Plugin { *; }
-keep public class * extends com.getcapacitor.Bridge { *; }
-keep public class * extends com.getcapacitor.BridgeActivity { *; }
-keep public class * extends com.getcapacitor.annotation.CapacitorPlugin { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Preserve Cordova compatibility layer
-keep class org.apache.cordova.** { *; }

# Strip Android Log calls in release builds
-assumenosideeffects class android.util.Log {
    public static boolean isLoggable(java.lang.String, int);
    public static int v(...);
    public static int d(...);
    public static int i(...);
    public static int w(...);
    public static int e(...);
}

# Obfuscate and repackage internal classes
-repackageclasses ''
-allowaccessmodification
