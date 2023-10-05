const hamburger = document.querySelector(".js_hamburger");
const wrapper = document.querySelector(".js_nav-wrapper");
const navigation = document.querySelector(".js_nav");
const body = document.querySelector(".js_body");
const img = document.querySelector(".js_img");
const imgBottom = document.querySelector(".js_img_bottom");
const headerLogo = document.querySelector(".js_header-logo");
const header = document.querySelector(".js_header");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  wrapper.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  body.classList.toggle("is-active");
  img.classList.toggle("is-active");
  imgBottom.classList.toggle("is-active");
  headerLogo.classList.toggle("is-active");
  header.classList.toggle("is-active");
});

const navLinks = document.querySelectorAll(".l_header-nav_link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    wrapper.classList.remove("is-active");
    navigation.classList.remove("is-active");
    body.classList.remove("is-active");
    img.classList.remove("is-active");
    imgBottom.classList.remove("is-active");
    headerLogo.classList.remove("is-active");
    header.classList.remove("is-active");
  });
});


// オープニングアニメ
const opening = document.querySelector(".js_opening");

if (opening !== null) {
  function OpeningAnime() {
    // bodyタグの範囲に対して.is-activeをつけ外しする（ハンバーガーで指定したoverflow:hiddenが効く）
    body.classList.toggle("is-active");
    gsap
      .timeline(function () {})
      .from(".js_opening_animation", {
        y: -100, // テキストのY軸の操作
        delay: 0, // アニメーションのスタートまでの遅延時間
        duration: 0.8, // アニメーションの時間
        ease: Bounce.easeOut, // イージングの設定
        autoAlpha: 0,
      })
      .from(".js_loading_logo", {
        y: -100, // テキストのY軸の操作
        delay: 0, // アニメーションのスタートまでの遅延時間
        duration: 1, // アニメーションの時間
        ease: Bounce.easeOut, // イージングの設定
        autoAlpha: 0,
      })
      .to(".js_opening_text", {
        y: 0, // テキストのY軸の操作
        stagger: 0.2, // テキスト間の遅延時間
        delay: 0.5, // アニメーションのスタートまでの遅延時間
        duration: 0.5, // アニメーションの時間
        ease: "power2.out", // イージングの設定
        autoAlpha: 1,
      })
      .to(".js_opening", {
        duration: 1, // アニメーションの時間
        autoAlpha: 0,
        delay: 1,
        onComplete: function () {
          body.classList.toggle("is-active");
        },
      });
  }

  function webStorage() {
    if (sessionStorage.getItem("access")) {
      //2回目以降アクセス時の処理には関数を実行しない
      opening.classList.add("is-active");
    } else {
      //初回アクセス時の処理
      sessionStorage.setItem("access", 0);
      OpeningAnime();
    }
  }
  webStorage();
}

// 画面幅小さくなってもいい感じになる
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value =
      window.outerWidth > 360
        ? "width=device-width,initial-scale=1"
        : "width=360";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
})();


// チェックボックス
const agreeCheckbox = document.querySelector(".contact_form_checkbox");
// 送信ボタン
const submitBtn = document.querySelector(".contact_form_btn");

if (agreeCheckbox && submitBtn !== null) {
  function updateSubmitButtonState() {
    if (agreeCheckbox.checked) {
      submitBtn.disabled = false; // チェックされている場合
    } else {
      submitBtn.disabled = true; // チェックされていない場合
    }
  }

  // ページのロード時に初期状態を設定する
  window.addEventListener("load", () => {
    updateSubmitButtonState();
  });

  // チェックボックスのクリック時に状態を更新する
  agreeCheckbox.addEventListener("click", () => {
    updateSubmitButtonState();
  });
}

gsap.fromTo(
  ".service_item",
  {
    y: 60,
    autoAlpha: 0,
  },
  {
    y: 0,
    autoAlpha: 1,
    duration: 1,
    scrollTrigger: {
      // アニメーションの発火するスクロール位置
      trigger: ".service_item",
      // スクロール位置の基準（markersをするとscroller-startと表示され、top centerは画面中央）
      start: "top center",
      // 発火するスクロール位置や終了位置をマーカーする
      // markers: true,
    },
    // 同じクラスがついた複数要素を順番にアニメーションする
    stagger: {
      // each: 指定した時間が経過された時に次の要素のアニメーションを開始する
      each: 0.6,
      // アニメーションする要素の順番
      from: "start",
    },
  }
);
