export const CustomPrevArrow = (props: React.ComponentProps<'div'>) => {
  const { className, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      onClick={onClick} // 기존 onClick이 정상적으로 작동
      id={'PORTFOLIO'}
    >
      &#10094; {/* 왼쪽 화살표 */}
    </div>
  );
};

export const CustomNextArrow = (props: React.ComponentProps<'div'>) => {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow next-arrow`} onClick={onClick}>
      &#10095; {/* 오른쪽 화살표 */}
    </div>
  );
};
