# Finanzas por Quincena — App nativa (Android)

App de Android generada con [Capacitor](https://capacitorjs.com) a partir de la
webapp `Finanzas mensuales`.

## Requisitos
- Node.js (ya instalado)
- Android Studio (falta instalarlo): https://developer.android.com/studio

## Compilar el APK (primera vez)

1. Instala **Android Studio** y ábrelo una vez (para que descargue el SDK).
2. Abre esta carpeta en Android Studio:
   - `Finanzas-quincena-app/android` (File → Open).
   - Espera a que sincronice Gradle (descarga dependencias la primera vez, tarda).
3. Menú **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
4. El APK queda en:
   `android/app/build/outputs/apk/debug/app-debug.apk`

### Compilar desde terminal (alternativa)

```powershell
cd android
.\gradlew.bat assembleDebug
```

## Actualizar la app cuando cambie la web

```powershell
# 1) Copia la web más reciente
Copy-Item "..\Finanzas mensuales\index.html" -Destination "www\index.html" -Force
# 2) Sincroniza con Android
npx cap sync android
# 3) Recompila
cd android; .\gradlew.bat assembleDebug; cd ..
```

## Detalles
- Splash nativo: fondo azul `#4f6ef7` sin logo (configurado en
  `android/app/src/main/res/values/styles.xml` y `drawable/splash_icon.xml`).
- Icono de la app: degradado + `$` (generado con `@capacitor/assets`).
