interface Props {
  tabIndex: number;
  currentIndex: number;
  text: string;
  onSetIndex: () => void;
}

export function TabBtn({ tabIndex, currentIndex, text, onSetIndex }) {
  const changeTab = (tabIndex: number) => {
    onSetIndex(tabIndex);
  };
  return (
    <button
      onClick={() => changeTab(tabIndex)}
      className={`pb-2 relative text-white ${
        tabIndex === currentIndex
          ? "font-bold activetab"
          : "text-[#6e6e6e] font-normal"
      }`}
    >
      {text}
    </button>
  );
}
