package com.vgl.beerpongportals;

import android.os.Bundle;
import com.zoontek.rnbootsplash.RNBootSplash;

import com.facebook.react.ReactActivity;


public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.background_splash, MainActivity.this); // <- display the generated bootsplash.xml drawable over our MainActivity
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Beerpong";
  }
}
