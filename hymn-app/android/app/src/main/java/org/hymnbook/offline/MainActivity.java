package org.hymnbook.offline;

import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Security & Anti-Reverse Engineering: Disable WebView remote debugging so DOM inspection and scraping via chrome://inspect are blocked
        WebView.setWebContentsDebuggingEnabled(false);
    }
}
