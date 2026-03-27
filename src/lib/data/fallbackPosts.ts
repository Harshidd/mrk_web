export interface FallbackPost {
    _id: string
    slug: { current: string }
    title: string
    excerpt: string
    category: string
    readingTime: number
    publishedAt: string
    bodyHtml: string
}

export const fallbackPosts: FallbackPost[] = [
    {
        _id: 'fp-1',
        slug: { current: 'egitimde-yapay-zeka-ile-nereden-baslanmali' },
        title: 'Eğitimde yapay zekâ ile nereden başlanmalı?',
        excerpt: 'Yapay zekâ araçlarını eğitime dahil ederken ilk adımı doğru seçmek neden önemlidir?',
        category: 'Yapay Zekâ',
        readingTime: 5,
        publishedAt: '2025-01-15T00:00:00Z',
        bodyHtml: `
<p>Yapay zekâ konuşulurken çoğu zaman iki uç ortaya çıkıyor. Bir tarafta her şeyi bir anda dönüştürmek isteyen büyük beklentiler, diğer tarafta ise "bu işler bize göre değil" diye geri çekilen bir yaklaşım var. Oysa eğitimde yapay zekâya başlamak için büyük ve karmaşık adımlara gerek yok. Asıl mesele, küçük ama gerçekten işe yarayan bir noktadan başlamak.</p>

<h2>Önce soruyu doğru seçmek gerekir</h2>
<p>Bir okulda, bir sınıfta ya da bireysel çalışma düzeninde yapay zekâyı kullanmanın ilk şartı "hangi problemi çözecek?" sorusuna cevap vermektir. Çünkü araç ne kadar güçlü olursa olsun, yanlış yerde kullanıldığında sadece dikkat dağıtır.</p>
<p>İlk aşamada en mantıklı kullanım alanları genellikle şunlardır:</p>
<ul>
  <li>tekrar eden metin işleri</li>
  <li>içerik taslağı hazırlama</li>
  <li>soru üretimi için ilk örnekler oluşturma</li>
  <li>değerlendirme ölçütlerini düzenleme</li>
  <li>veriyi daha okunur hale getirme</li>
</ul>
<p>Burada amaç öğretmenin yerine geçmek değil, öğretmenin yükünü hafifletmektir.</p>

<h2>Küçük başlamak neden daha doğrudur?</h2>
<p>Eğitim ortamlarında en büyük hata, yapay zekâyı büyük bir proje gibi ele almaktır. Oysa küçük başlamak daha güvenlidir. Çünkü küçük kullanım senaryolarında şu üç şey daha kolay görülür:</p>
<ul>
  <li>gerçekten zaman kazandırıyor mu?</li>
  <li>çıktı kalitesi yeterli mi?</li>
  <li>öğretmenin iş akışına uyuyor mu?</li>
</ul>
<p>Mesela sadece rubrik hazırlamada ya da soru taslağı üretiminde kullanılan bir yardımcı yapı bile ciddi fark oluşturabilir.</p>

<h2>Yapay zekâyı "yardımcı katman" gibi düşünmek gerekir</h2>
<p>Bence en sağlıklı yaklaşım şu: yapay zekâyı karar verici değil, yardımcı katman gibi görmek. Çünkü eğitim sadece içerik üretmekten ibaret değil; bağlamı, öğrenci düzeyini, okul kültürünü ve öğretmenin sezgisini de içerir.</p>
<p>Yapay zekâ burada daha çok şunları yapmalıdır:</p>
<ul>
  <li>hızlandırmak</li>
  <li>düzenlemek</li>
  <li>görünür hale getirmek</li>
  <li>ilk taslağı çıkarmak</li>
</ul>
<p>Son sözü yine insan söylemelidir.</p>

<h2>Nereden başlanabilir?</h2>
<p>Başlangıç için en mantıklı alanlar şunlar olabilir:</p>
<ol>
  <li>soru taslakları</li>
  <li>kısa metin özetleri</li>
  <li>değerlendirme rubrikleri</li>
  <li>sınav verisi yorumlama</li>
  <li>öğretmen için içerik hazırlık destekleri</li>
</ol>
<p>Bu alanlar hem düşük risklidir hem de hızlı geri bildirim verir.</p>

<h2>Sonuç</h2>
<p>Eğitimde yapay zekâya başlamak için büyük altyapılar kurmak gerekmez. Önce küçük, net ve işe yarayan kullanım alanları seçmek gerekir. En doğru başlangıç, öğretmenin zamanını geri veren ve karar yükünü azaltan alanlardır. Sağlam sistemler çoğu zaman küçük ama doğru adımlarla başlar.</p>
`
    },
    {
        _id: 'fp-2',
        slug: { current: 'sinav-analizi-neden-sadece-not-ortalamasi-degildir' },
        title: 'Sınav analizi neden sadece not ortalaması değildir?',
        excerpt: 'Sınav verisi sadece başarı sıralaması değil, öğrenme sürecini anlamak için de önemli bir kaynaktır.',
        category: 'Eğitim Teknolojileri',
        readingTime: 6,
        publishedAt: '2025-02-10T00:00:00Z',
        bodyHtml: `
<p>Sınav sonuçları çoğu zaman tek bir satıra indirgenir: ortalama kaç, en yüksek not kaç, en düşük not kaç? Bu veriler elbette bir anlam taşır ama tek başına yeterli değildir. Çünkü sınav, sadece puan üretmek için yapılmaz; öğrenme sürecini anlamak için de önemli bir iz bırakır.</p>

<h2>Ham veri neden yetmez?</h2>
<p>Bir sınıfta ortalama yüksek olabilir ama bu gerçekten öğrenmenin sağlıklı dağıldığını göstermez. Bazen birkaç güçlü öğrenci ortalamayı yükseltir, geri kalan büyük bölüm ise belli konularda zorlanmaya devam eder. Ham puanlar bunu tek başına anlatmaz.</p>
<p>Burada sınav analizi dediğimiz şey, puanın arkasındaki yapıya bakabilmektir:</p>
<ul>
  <li>hangi konu zorlandı?</li>
  <li>hangi kazanım beklenenden düşük kaldı?</li>
  <li>sınıfın genel eğilimi ne?</li>
  <li>bireysel farklılıklar hangi düzeyde?</li>
</ul>

<h2>Öğretmen için gerçek fayda nedir?</h2>
<p>Doğru analiz edilmiş sınav verisi öğretmene sadece "kaç aldılar?" sorusunun cevabını vermez. Aynı zamanda "bundan sonra ne yapmalıyım?" sorusuna da yaklaşım sunar.</p>
<p>Örneğin:</p>
<ul>
  <li>belirli bir konuda tekrar gerekir mi?</li>
  <li>grup bazlı destek mi lazım?</li>
  <li>ölçme aracı gerçekten doğru hazırlanmış mı?</li>
  <li>soru dağılımı dengeli mi?</li>
</ul>
<p>Bu yüzden sınav analizi, not girişinden daha değerli bir katmandır.</p>

<h2>Yönetici açısından neden önemlidir?</h2>
<p>Okul yöneticileri için de sınav analizi sadece başarı tablosu değildir. Çünkü düzenli veri analizi, karar vermeyi daha sağlam hale getirir. Hangi sınıfta daha fazla desteğe ihtiyaç olduğu, hangi derslerde kazanım bazlı sorun yaşandığı ya da hangi süreçlerin daha çok izlenmesi gerektiği ancak anlamlı veri ile görülebilir.</p>

<h2>Görselleştirme neden önemli?</h2>
<p>Veri ne kadar doğru olursa olsun, görünür değilse etkisi azalır. Öğretmen ya da yönetici ekrana baktığında tabloyu hızlıca anlayabilmeli. Bu yüzden sınav analizi sistemlerinde grafik, konu dağılımı, öğrenci bazlı görünüm ve genel eğilim göstergeleri önem kazanır.</p>

<h2>Sonuç</h2>
<p>Sınav analizi, not ortalamasının biraz daha süslü hali değildir. Asıl değeri, öğrenme sürecini görünür hale getirmesidir. Eğer veri sadece kayıt için tutuluyorsa sınırlı fayda üretir. Ama doğru yorumlanırsa öğretmen için de okul için de güçlü bir karar destek aracına dönüşür.</p>
`
    },
    {
        _id: 'fp-3',
        slug: { current: 'kucuk-dijital-araclar-neden-buyuk-fark-yaratir' },
        title: 'Küçük dijital araçlar neden büyük fark yaratır?',
        excerpt: 'Büyük sistemler kadar, küçük ve doğru tasarlanmış araçlar da iş akışını ciddi şekilde değiştirebilir.',
        category: 'Dijital Verimlilik',
        readingTime: 5,
        publishedAt: '2025-03-01T00:00:00Z',
        bodyHtml: `
<p>Dijital üretim denince çoğu insanın aklına büyük platformlar, kapsamlı yazılımlar ve uzun geliştirme süreçleri gelir. Oysa günlük hayatta en çok fark yaratan şey çoğu zaman küçük araçlardır. Çünkü tekrar eden işleri azaltan, birkaç dakikalık yükü ortadan kaldıran yapılar zamanla ciddi rahatlık sağlar.</p>

<h2>Küçük araç ne demek?</h2>
<p>Küçük araç, tek bir işi iyi yapan yardımcı sistemdir. Yani her şeyi çözmeye çalışmaz. Sadece belirli bir soruna odaklanır.</p>
<p>Örneğin:</p>
<ul>
  <li>not dönüşümü</li>
  <li>sınav şablonu oluşturma</li>
  <li>rubrik düzenleme</li>
  <li>PDF ya da Excel yardımcıları</li>
  <li>prompt düzenleme araçları</li>
</ul>
<p>Bunlar tek başına dev platformlar değildir ama kullanım sıklıkları nedeniyle büyük etki üretir.</p>

<h2>Neden daha değerliler?</h2>
<p>Çünkü büyük sistemler herkese her zaman lazım olmaz. Ama küçük araçlar günlük iş akışında daha sık kullanılır. Bir öğretmenin, geliştiricinin ya da içerik üreten birinin günde birkaç kez işine yarayacak bir mini araç, çoğu zaman büyük ama nadiren kullanılan sistemlerden daha fazla fayda sağlar.</p>

<h2>Tasarım burada neden önemli?</h2>
<p>Küçük araçların değerini artıran şey sadece fonksiyon değildir. Aracın sade olması, ne yaptığına hemen anlaşılır şekilde odaklanması ve kullanıcıyı yormaması gerekir. İnsanlar mini araçları öğrenmek için zaman harcamak istemez. Açtığında ne yaptığını anlamalı ve sonucu hızlıca almalıdır.</p>

<h2>Hangi alanlarda daha etkili?</h2>
<p>Benim gördüğüm kadarıyla küçük dijital araçlar özellikle şu alanlarda çok etkili:</p>
<ul>
  <li>eğitim süreçleri</li>
  <li>belge düzenleme</li>
  <li>veri temizleme</li>
  <li>küçük otomasyonlar</li>
  <li>içerik üretimi</li>
  <li>yapay zekâ destekli yardımcı işler</li>
</ul>
<p>Bu tarz araçlar tek başına "ürün" gibi görünmese de toplamda ciddi bir üretim konforu sağlar.</p>

<h2>Sonuç</h2>
<p>Büyük sistemler etkileyicidir ama küçük dijital araçlar günlük hayatı gerçekten değiştirir. Çünkü farkı büyük laflarla değil, tekrar eden yükleri azaltarak üretirler. Bazen iyi düşünülmüş küçük bir araç, uzun süredir çözülemeyen bir sürtünmeyi sessizce ortadan kaldırır.</p>
`
    },
    {
        _id: 'fp-4',
        slug: { current: 'bir-egitim-teknolojisi-urununu-fikirden-prototipe-tasimak' },
        title: 'Bir eğitim teknolojisi ürününü fikirden prototipe taşımak',
        excerpt: 'Bir fikirle başlamak kolaydır; önemli olan onu kullanılabilir bir prototipe dönüştürebilmektir.',
        category: 'Gelişim Notları',
        readingTime: 6,
        publishedAt: '2025-03-20T00:00:00Z',
        bodyHtml: `
<p>Bir eğitim teknolojisi fikri bulmak sanıldığı kadar zor değil. Zor olan, o fikri gerçekten kullanılabilir bir prototipe dönüştürmek. Çünkü fikir aşamasında her şey temiz görünür; prototip aşamasında ise gerçek dünya devreye girer.</p>

<h2>Fikir neden tek başına yetmez?</h2>
<p>Çünkü çoğu fikir problem cümlesiyle değil, çözüm hevesiyle başlar. Oysa doğru yol bunun tersidir. Önce problem netleşmeli. Kim neyi neden yaşıyor? Hangi noktada zaman kaybediyor? Hangi süreç görünmez kaldığı için zorlaşıyor?</p>
<p>Bunlar net değilse ürün fikri dağılır.</p>

<h2>İlk prototipin amacı ne olmalı?</h2>
<p>İlk prototip tam ürün olmak zorunda değildir. Asıl amacı şunu test etmektir:</p>
<ul>
  <li>gerçekten işe yarıyor mu?</li>
  <li>kullanıcı mantığı doğru mu?</li>
  <li>değer ürettiği nokta net mi?</li>
</ul>
<p>Bu yüzden ilk prototipte gereksiz özellik yüklemek hatalıdır. Küçük ama net çalışan bir yapı daha değerlidir.</p>

<h2>Eğitim alanında neden daha dikkatli ilerlemek gerekir?</h2>
<p>Çünkü eğitim araçları sadece teknik olarak değil, kullanım bağlamı açısından da hassastır. Bir öğretmen, yönetici ya da öğrenci için geliştirilen sistem:</p>
<ul>
  <li>sade olmalı</li>
  <li>hızlı anlaşılmalı</li>
  <li>fazla menüye boğulmamalı</li>
  <li>gerçekten zaman kazandırmalı</li>
</ul>
<p>Yani burada sadece "yapabiliyor olmak" yetmez, "kullanılabilir olmak" da gerekir.</p>

<h2>Prototipin değeri nedir?</h2>
<p>İyi bir prototip, fikri görünür hale getirir. İnsanlar lafı değil, çalışan akışı değerlendirir. Bu yüzden prototip yatırım aracı, geri bildirim toplama aracı veya ürünün yönünü netleştirici işlev görebilir. Özellikle eğitim teknolojilerinde küçük ama çalışan bir demo, uzun sunumlardan daha ikna edicidir.</p>

<h2>Sonuç</h2>
<p>Bir fikri prototipe taşımak, heyecanı korurken gereksizi budamayı gerektirir. Eğitim teknolojisinde sağlam ürünler, büyük vaatlerden değil; doğru problemi seçen ve sade çalışan ilk prototiplerden çıkar. Asıl fark, fikri anlatmakta değil, çalışır hale getirmekte ortaya çıkar.</p>
`
    }
]
