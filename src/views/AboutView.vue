<template>
  <article class="bg-[#F6F4EE] min-h-screen py-16 sm:py-20 border-b border-[#E3D9CE]">
    <div class="max-w-3xl mx-auto px-5 lg:px-8 font-sans space-y-10">
      
      <!-- Article Header Meta -->
      <header class="space-y-4 text-center">
        <div class="flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] font-bold text-[#AD9277]">
          <span>Jurnal Studio</span>
          <span>•</span>
          <span>Kisah Brand</span>
        </div>

        <h1 class="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A1A1A] leading-tight sm:leading-tight">
          Menghadirkan Kemewahan yang Tenang dan Abadi
        </h1>

        <p class="text-xs sm:text-sm text-[#6B6B6B] italic font-serif max-w-xl mx-auto">
          Perjalanan Avara Studio dalam merajut estetika minimalis, kejujuran material kulit asli, dan keahlian tangan pengrajin.
        </p>

        <div class="pt-4 flex items-center justify-center gap-4 text-[11px] text-[#8C755E]">
          <span class="font-semibold text-[#1A1A1A]">Oleh Tim Kurator Avara</span>
          <span>—</span>
          <time datetime="2026-09-07">Waktu Baca 3 Menit</time>
        </div>

        <div class="w-16 h-0.5 bg-[#AD9277] mx-auto rounded-full mt-6"></div>
      </header>

      <!-- Featured Article Image -->
      <figure class="space-y-2">
        <div class="overflow-hidden rounded-3xl border border-[#E3D9CE] shadow-sm bg-white p-2">
          <img
            src="/images/hero_fashion.jpg"
            alt="Suasana Studio dan Produk Avara"
            class="w-full h-80 sm:h-[420px] object-cover rounded-2xl"
          />
        </div>
        <figcaption class="text-[11px] text-center text-[#8C755E] italic">
          Koleksi busana dan barang kulit Avara Studio yang memadukan garis desain bersih dengan warna bumi yang hangat.
        </figcaption>
      </figure>

      <!-- Main Editorial Article Body -->
      <main class="bg-white p-8 sm:p-12 border border-[#E3D9CE] rounded-3xl shadow-xs space-y-8 text-sm text-[#3A3A3A] leading-relaxed font-sans">
        
        <!-- Intro Paragraph -->
        <p class="text-base sm:text-lg text-[#1A1A1A] font-serif leading-relaxed first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#AD9277] first-letter:mr-3 first-letter:float-left first-letter:font-serif">
          Di tengah dinamika tren fashion yang terus berganti setiap musim, Avara Studio berdiri di atas sebuah keyakinan sederhana: keindahan sejati tidak perlu berteriak untuk menarik perhatian. Kami merancang setiap karya dengan prinsip kemewahan yang tenang (*quiet luxury*) yang mengutamakan kenyamanan, daya tahan, serta nilai estetika yang tak lekang oleh waktu.
        </p>

        <hr class="border-[#E3D9CE]" />

        <!-- Article Section 1 -->
        <section class="space-y-3">
          <h2 class="font-serif text-2xl font-bold text-[#1A1A1A]">
            Dedikasi Pada Keaslian Material
          </h2>
          <p>
            Bagi kami, material adalah jiwa dari setiap produk. Seluruh produk *Leather Goods* kami diproduksi menggunakan 100% *Genuine Full-Grain Italian Leather* yang dipilih secara teliti. Tekstur alami kulit tidak disembunyikan di balik lapisan sintetis, melainkan dibiarkan memancarkan karakter aslinya yang kian memikat seiring berjalannya waktu.
          </p>
          <p>
            Begitu pula dengan koleksi busana kami yang memanfaatkan paduan wol cashmere murni dan bahan suede berkualitas tinggi, memberikan sentuhan kelembutan maksimal yang nyaman dikenakan sepanjang hari.
          </p>
        </section>

        <!-- Pull Quote Block -->
        <blockquote class="my-8 py-6 px-8 bg-[#F6F4EE] border-l-4 border-[#AD9277] rounded-r-2xl space-y-2">
          <p class="font-serif italic text-base sm:text-lg text-[#2A1D15] leading-relaxed">
            "Produk terbaik tidak sekadar melengkapi gaya hidup Anda, melainkan menceritakan kisah tentang apresiasi terhadap standar kualitas dan detail pengerjaan."
          </p>
          <cite class="block text-xs font-bold uppercase tracking-wider text-[#AD9277] not-italic">
            — Catatan Desain Avara Studio
          </cite>
        </blockquote>

        <!-- Article Section 2 -->
        <section class="space-y-3">
          <h2 class="font-serif text-2xl font-bold text-[#1A1A1A]">
            Sentuhan Keahlian Tangan Pengrajin
          </h2>
          <p>
            Di belakang setiap jahitan dan hardware bronze kuningan Avara Studio, terdapat tangan-tangan pengrajin berpengalaman yang telah mengasah keahlian mereka selama bertahun-tahun. Proses produksi kami menggabungkan teknik pengerjaan tradisional dengan presisi modern untuk memastikan setiap kompartemen, sol sepatu, hingga botol wewangian memiliki standar kesempurnaan tertinggi.
          </p>
        </section>

        <!-- Article Section 3 -->
        <section class="space-y-3">
          <h2 class="font-serif text-2xl font-bold text-[#1A1A1A]">
            Komitmen Untuk Masa Depan
          </h2>
          <p>
            Kami percaya bahwa proses pembuatan produk mewah harus berjalan beriringan dengan tanggung jawab terhadap lingkungan. Avara Studio menerapkan metode produksi terbatas (*small-batch production*) untuk menekan pemborosan bahan dan memastikan setiap produk yang Anda miliki diproduksi secara etis.
          </p>
        </section>

        <hr class="border-[#E3D9CE]" />

        <!-- Article Footer / Author Sign-off -->
        <footer class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C755E]">
          <div class="space-y-1">
            <p class="font-serif font-bold text-[#1A1A1A]">Avara Studio Concierge & Editorial</p>
            <p>Jakarta Selatan, Indonesia</p>
          </div>
          <router-link to="/shop">
            <span class="inline-flex items-center gap-1 font-bold text-[#AD9277] hover:underline">
              Jelajahi Koleksi Produk &rarr;
            </span>
          </router-link>
        </footer>

      </main>

    </div>
  </article>
</template>

<script setup lang="ts">
</script>
