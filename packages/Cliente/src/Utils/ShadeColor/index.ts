function shadeColor(color: string, amount: number): string {
  return `#${color.replace(/^#/, '').replace(/../g, (colorReplace) => (`0${Math.min(255, Math.max(0, parseInt(colorReplace, 16) + amount)).toString(16)}`).substr(-2))}`;
}

export default shadeColor;
