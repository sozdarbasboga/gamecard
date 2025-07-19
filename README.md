# Kart Eşleştirme Oyunu

[Canlı Demo](https://gamecard-sozdar.netlify.app)

Bu proje, React ile geliştirilmiş bir kart eşleştirme (hafıza) oyunudur. Amaç, 5x5'lik bir matris üzerinde rastgele dağılmış kart çiftlerini bulup eşleştirmektir.

## Özellikler
- 5x5 matris üzerinde toplam 25 kart (12 çift + 1 joker)
- Kartlar her oyun başında rastgele karıştırılır
- Her kart çifti farklı bir emoji ile temsil edilir
- İki kart açıldığında:
  - Eğer kartlar aynıysa açık kalır ve 50 puan eklenir
  - Eğer kartlar farklıysa 1 saniye sonra kapanır ve 10 puan eksilir
- Puan ekranın üst kısmında gösterilir
- Tüm kartlar açıldığında "Yeniden Oyna" butonu çıkar ve oyun sıfırlanır
- Kartlar arasında geniş boşluk ve sade bir tasarım
- Açık karta tekrar tıklanırsa kart kapanır

## Kurulum

1. Bu projeyi bilgisayarınıza klonlayın:

   ```bash
   git clone <proje-linkiniz>
   cd gamecard
   ```

2. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:

   ```bash
   npm run dev
   ```

4. Tarayıcınızda [http://localhost:5173](http://localhost:5173) adresine gidin.

## Oyun Kuralları
- Aynı anda en fazla iki kart açabilirsiniz.
- İki kart açıldığında:
  - Aynıysa açık kalır ve 50 puan kazanırsınız.
  - Farklıysa 1 saniye sonra kapanır ve 10 puan kaybedersiniz.
- Tüm kartları eşleştirince oyun biter ve puanınız ekranda kalır.
- "Yeniden Oyna" butonuna basarak oyunu sıfırlayabilirsiniz.

## Katkı
Katkıda bulunmak isterseniz, lütfen bir pull request gönderin veya issue açın.

## Lisans
Bu proje MIT lisansı ile lisanslanmıştır.
