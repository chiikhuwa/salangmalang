export const productTags = ["#색이 예쁘다", "#비교적 저렴하다", "#가볍다"];

export const sampleProducts = [
  {
    id: "laptop",
    title: "MacBook Air 13",
    price: 1290000,
    image: "/products/laptop.jpg",
    background: "#f1eae2",
    analysis: "다른 맥북에 비해 가격이 저렴하고 가벼워 휴대성이 좋은 건 사실이에요.\n하지만 용량이 적고 일부 프로그램을 가동하기 어려울 수 있어요.\n어떤 용도로 사용하느냐가 중요해요.",
  },
  {
    id: "headphones",
    title: "무선 노이즈 캔슬링 헤드폰",
    price: 249000,
    image: "/products/headphones.jpg",
    background: "#e9edf2",
    analysis: "주변 소음을 줄여 음악과 작업에 집중하기 좋아요.\n다만 오래 착용하면 무게가 부담될 수 있어요.\n착용감과 배터리 사용 시간을 함께 살펴보세요.",
  },
  {
    id: "camera",
    title: "미러리스 카메라",
    price: 890000,
    image: "/products/camera.jpg",
    background: "#ecebe8",
    analysis: "여행과 일상을 더 선명하게 기록할 수 있어요.\n렌즈와 액세서리 비용이 추가될 수 있어요.\n휴대폰과 비교해 얼마나 자주 사용할지 생각해 보세요.",
  },
  {
    id: "sneakers",
    title: "데일리 러닝 스니커즈",
    price: 119000,
    image: "/products/sneakers.jpg",
    background: "#fae5df",
    analysis: "가벼운 운동과 일상에 두루 활용하기 좋아요.\n발 모양에 따라 착용감이 다를 수 있어요.\n사이즈와 교환 조건을 먼저 확인해 보세요.",
  },
  {
    id: "watch",
    title: "미니멀 손목시계",
    price: 159000,
    image: "/products/watch.jpg",
    background: "#f2f0e8",
    analysis: "심플한 디자인이라 여러 옷차림에 잘 어울려요.\n스트랩 소재에 따라 관리 방법이 달라요.\n방수 등급과 손목에 맞는 크기를 확인해 보세요.",
  },
  {
    id: "sunglasses",
    title: "클래식 선글라스",
    price: 89000,
    image: "/products/sunglasses.jpg",
    background: "#e8eddf",
    analysis: "햇빛이 강한 날 눈을 보호하는 데 도움이 돼요.\n렌즈 색보다 자외선 차단 성능이 중요해요.\n얼굴에 맞는 크기와 차단 인증을 확인해 보세요.",
  },
  {
    id: "speaker",
    title: "포터블 블루투스 스피커",
    price: 79000,
    image: "/products/speaker.jpg",
    background: "#e7e6ef",
    analysis: "작은 크기로 어디서든 음악을 즐길 수 있어요.\n작은 스피커는 저음과 최대 음량에 한계가 있어요.\n주로 사용할 공간과 방수 기능을 비교해 보세요.",
  },
  {
    id: "backpack",
    title: "에브리데이 백팩",
    price: 69000,
    image: "/products/backpack.jpg",
    background: "#e8e5e0",
    analysis: "여러 소지품을 나누어 담기 편한 데일리 가방이에요.\n물건을 많이 넣으면 어깨에 부담이 될 수 있어요.\n노트북 수납 크기와 어깨끈 쿠션을 확인해 보세요.",
  },
];

export function formatPrice(price) {
  return `${new Intl.NumberFormat("ko-KR").format(price)}원`;
}
