package com.example.tetrisclockapp

import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.app.Activity

class MainActivity : Activity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    val webView = findViewById<WebView>(R.id.webview)
    val settings = webView.settings
    settings.javaScriptEnabled = true
    settings.domStorageEnabled = true
    settings.cacheMode = WebSettings.LOAD_NO_CACHE
    settings.allowFileAccess = true
    settings.allowContentAccess = true

    webView.setBackgroundColor(0x00000000)
    webView.loadUrl("file:///android_asset/TetrisClock.html")
  }

  override fun onPause() {
    super.onPause()
    val webView = findViewById<WebView>(R.id.webview)
    webView.onPause()
  }

  override fun onResume() {
    super.onResume()
    val webView = findViewById<WebView>(R.id.webview)
    webView.onResume()
  }
}
