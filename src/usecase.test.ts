import { Temporal } from "@js-temporal/polyfill";
import { ethernalSummerVacationCalendar } from "./ethernal-calendar";

it("Days in 2021", () => {
  let result = "";
  let today = Temporal.PlainDate.from("2021-01-01").withCalendar(
    ethernalSummerVacationCalendar
  );
  while (today.year === 2021) {
    result += `${today.year}年${today.month}月${today.day}日\n`;
    today = today.add({ days: 1 });
  }
  expect(result).toMatchInlineSnapshot(`
"2021年1月1日
2021年1月2日
2021年1月3日
2021年1月4日
2021年1月5日
2021年1月6日
2021年1月7日
2021年1月8日
2021年1月9日
2021年1月10日
2021年1月11日
2021年1月12日
2021年1月13日
2021年1月14日
2021年1月15日
2021年1月16日
2021年1月17日
2021年1月18日
2021年1月19日
2021年1月20日
2021年1月21日
2021年1月22日
2021年1月23日
2021年1月24日
2021年1月25日
2021年1月26日
2021年1月27日
2021年1月28日
2021年1月29日
2021年1月30日
2021年1月31日
2021年2月1日
2021年2月2日
2021年2月3日
2021年2月4日
2021年2月5日
2021年2月6日
2021年2月7日
2021年2月8日
2021年2月9日
2021年2月10日
2021年2月11日
2021年2月12日
2021年2月13日
2021年2月14日
2021年2月15日
2021年2月16日
2021年2月17日
2021年2月18日
2021年2月19日
2021年2月20日
2021年2月21日
2021年2月22日
2021年2月23日
2021年2月24日
2021年2月25日
2021年2月26日
2021年2月27日
2021年2月28日
2021年3月1日
2021年3月2日
2021年3月3日
2021年3月4日
2021年3月5日
2021年3月6日
2021年3月7日
2021年3月8日
2021年3月9日
2021年3月10日
2021年3月11日
2021年3月12日
2021年3月13日
2021年3月14日
2021年3月15日
2021年3月16日
2021年3月17日
2021年3月18日
2021年3月19日
2021年3月20日
2021年3月21日
2021年3月22日
2021年3月23日
2021年3月24日
2021年3月25日
2021年3月26日
2021年3月27日
2021年3月28日
2021年3月29日
2021年3月30日
2021年3月31日
2021年4月1日
2021年4月2日
2021年4月3日
2021年4月4日
2021年4月5日
2021年4月6日
2021年4月7日
2021年4月8日
2021年4月9日
2021年4月10日
2021年4月11日
2021年4月12日
2021年4月13日
2021年4月14日
2021年4月15日
2021年4月16日
2021年4月17日
2021年4月18日
2021年4月19日
2021年4月20日
2021年4月21日
2021年4月22日
2021年4月23日
2021年4月24日
2021年4月25日
2021年4月26日
2021年4月27日
2021年4月28日
2021年4月29日
2021年4月30日
2021年5月1日
2021年5月2日
2021年5月3日
2021年5月4日
2021年5月5日
2021年5月6日
2021年5月7日
2021年5月8日
2021年5月9日
2021年5月10日
2021年5月11日
2021年5月12日
2021年5月13日
2021年5月14日
2021年5月15日
2021年5月16日
2021年5月17日
2021年5月18日
2021年5月19日
2021年5月20日
2021年5月21日
2021年5月22日
2021年5月23日
2021年5月24日
2021年5月25日
2021年5月26日
2021年5月27日
2021年5月28日
2021年5月29日
2021年5月30日
2021年5月31日
2021年6月1日
2021年6月2日
2021年6月3日
2021年6月4日
2021年6月5日
2021年6月6日
2021年6月7日
2021年6月8日
2021年6月9日
2021年6月10日
2021年6月11日
2021年6月12日
2021年6月13日
2021年6月14日
2021年6月15日
2021年6月16日
2021年6月17日
2021年6月18日
2021年6月19日
2021年6月20日
2021年6月21日
2021年6月22日
2021年6月23日
2021年6月24日
2021年6月25日
2021年6月26日
2021年6月27日
2021年6月28日
2021年6月29日
2021年6月30日
2021年7月1日
2021年7月2日
2021年7月3日
2021年7月4日
2021年7月5日
2021年7月6日
2021年7月7日
2021年7月8日
2021年7月9日
2021年7月10日
2021年7月11日
2021年7月12日
2021年7月13日
2021年7月14日
2021年7月15日
2021年7月16日
2021年7月17日
2021年7月18日
2021年7月19日
2021年7月20日
2021年7月21日
2021年7月22日
2021年7月23日
2021年7月24日
2021年7月25日
2021年7月26日
2021年7月27日
2021年7月28日
2021年7月29日
2021年7月30日
2021年7月31日
2021年8月1日
2021年8月2日
2021年8月3日
2021年8月4日
2021年8月5日
2021年8月6日
2021年8月7日
2021年8月8日
2021年8月9日
2021年8月10日
2021年8月11日
2021年8月12日
2021年8月13日
2021年8月14日
2021年8月15日
2021年8月16日
2021年8月17日
2021年8月18日
2021年8月19日
2021年8月20日
2021年8月21日
2021年8月22日
2021年8月23日
2021年8月24日
2021年8月25日
2021年8月26日
2021年8月27日
2021年8月28日
2021年8月29日
2021年8月30日
2021年8月31日
2021年8月32日
2021年8月33日
2021年8月34日
2021年8月35日
2021年8月36日
2021年8月37日
2021年8月38日
2021年8月39日
2021年8月40日
2021年8月41日
2021年8月42日
2021年8月43日
2021年8月44日
2021年8月45日
2021年8月46日
2021年8月47日
2021年8月48日
2021年8月49日
2021年8月50日
2021年8月51日
2021年8月52日
2021年8月53日
2021年8月54日
2021年8月55日
2021年8月56日
2021年8月57日
2021年8月58日
2021年8月59日
2021年8月60日
2021年8月61日
2021年8月62日
2021年8月63日
2021年8月64日
2021年8月65日
2021年8月66日
2021年8月67日
2021年8月68日
2021年8月69日
2021年8月70日
2021年8月71日
2021年8月72日
2021年8月73日
2021年8月74日
2021年8月75日
2021年8月76日
2021年8月77日
2021年8月78日
2021年8月79日
2021年8月80日
2021年8月81日
2021年8月82日
2021年8月83日
2021年8月84日
2021年8月85日
2021年8月86日
2021年8月87日
2021年8月88日
2021年8月89日
2021年8月90日
2021年8月91日
2021年8月92日
2021年8月93日
2021年8月94日
2021年8月95日
2021年8月96日
2021年8月97日
2021年8月98日
2021年8月99日
2021年8月100日
2021年8月101日
2021年8月102日
2021年8月103日
2021年8月104日
2021年8月105日
2021年8月106日
2021年8月107日
2021年8月108日
2021年8月109日
2021年8月110日
2021年8月111日
2021年8月112日
2021年8月113日
2021年8月114日
2021年8月115日
2021年8月116日
2021年8月117日
2021年8月118日
2021年8月119日
2021年8月120日
2021年8月121日
2021年8月122日
2021年8月123日
2021年8月124日
2021年8月125日
2021年8月126日
2021年8月127日
2021年8月128日
2021年8月129日
2021年8月130日
2021年8月131日
2021年8月132日
2021年8月133日
2021年8月134日
2021年8月135日
2021年8月136日
2021年8月137日
2021年8月138日
2021年8月139日
2021年8月140日
2021年8月141日
2021年8月142日
2021年8月143日
2021年8月144日
2021年8月145日
2021年8月146日
2021年8月147日
2021年8月148日
2021年8月149日
2021年8月150日
2021年8月151日
2021年8月152日
2021年8月153日
"
`);
});
