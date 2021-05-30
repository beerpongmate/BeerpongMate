import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View, SafeAreaView } from "react-native";
import ThemedText from "../components/ThemedComponents/ThemedText";
import { translationList } from "../translations/i18n";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 26
  },
  languageButton: {
    marginHorizontal: 15
  },
  languageLabel: {
    fontSize: 20
  },
  languageContainer: {
    padding: 15
  }
});

const LanguageScreen = () => {
  const { i18n, t } = useTranslation("language");

  const selectLanguage = (key) => {
    i18n.changeLanguage(key);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText style={styles.title}>{t("title")}</ThemedText>
      {translationList.map(({ key, name }) => (
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => selectLanguage(key)}
        >
          <View style={styles.languageContainer}>
            <ThemedText style={styles.languageLabel}>{name}</ThemedText>
          </View>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default LanguageScreen;
