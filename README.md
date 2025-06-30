📌 PROJE: React + Firebase Not Takip Uygulaması

Bu proje, React ve Firebase Realtime Database kullanarak gerçek zamanlı bir not ekleme ve silme sistemi sağlar.
Kullanıcılar isim, soyisim ve not girerek kaydedebilir, tüm değişiklikler anlık olarak Firebase üzerinden senkronize edilir.

,
⚙️ Firebase Ayarları:

Uygulamanın veritabanına erişebilmesi için aşağıdaki security rules Firebase Console üzerinden eklenmelidir:

1. Firebase Console'a gidin: https://console.firebase.google.com
2. Sol menüden "Build" > "Realtime Database" sekmesine geçin.
3. Sağ üstte yer alan "Rules" sekmesine tıklayın.
4. Aşağıdaki JSON içeriğini kural kutusuna yapıştırın:

{
  "rules": {
    "notes": {
      ".read": true,
      ".write": true
    }
  }
}

5. "Publish" butonuna tıklayarak değişiklikleri kaydedin.



firebase.js içindeki firebaseConfig alanını Firebase Console'daki
"Project Settings > General" sekmesinde yer alan
"Firebase SDK snippet (config)" bölümünden alınan bilgilerle doldurun.

Örnek:
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};


