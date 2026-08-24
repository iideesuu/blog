import type { Metadata } from "next";
import { CopyHelpMessage } from "@/components/CopyHelpMessage";

export const metadata: Metadata = {
  title: "需要帮助",
  description: "当你或身边的人处于心理危机时，可以立即采取的现实行动。"
};

const helpMessage =
  "我现在很难熬，并且担心自己会伤害自己。请现在联系我或来陪我，不要让我一个人待着。你可以陪我拨打 12356，或陪我去医院急诊。";

export default function HelpPage() {
  return (
    <main id="main-content" className="page-width help-page">
      <header className="help-heading">
        <p className="eyebrow">YOU DO NOT HAVE TO DO THIS ALONE</p>
        <h1>需要帮助</h1>
        <p className="help-lead">
          你不必一次解决整个人生。先喝一点水，去有人的地方，把感受告诉一个信任的人。只做下一件小事，也算向前。
        </p>
      </header>

      <section className="emergency-card" aria-labelledby="emergency-title">
        <p className="card-kicker">如果你可能马上伤害自己</p>
        <h2 id="emergency-title">请先离开危险环境，不要独处。</h2>
        <ul className="action-list">
          <li>去一个有人的安全地点，或请可信的人立刻来陪你。</li>
          <li>把可能伤害自己的物品交给别人保管，拉开你与危险环境的距离。</li>
          <li>如果自己难以打电话，把手机交给身边的人，请对方代为联系。</li>
        </ul>
        <div className="emergency-actions">
          <a className="primary-action" href="tel:12356">全国心理援助热线 12356</a>
          <a className="secondary-action" href="tel:120">紧急医疗 120</a>
          <a className="secondary-action" href="tel:110">紧急求助 110</a>
        </div>
        <p className="card-note">危险迫在眉睫时，请拨打 120/110，或直接前往最近的医院急诊。</p>
        <p className="waiting-guidance">
          <strong>等待帮助时：</strong>去明亮且有人在的地方，保持电话畅通，做缓慢呼吸，把注意力放在接下来的十分钟。此页不能替代紧急服务。
        </p>
      </section>

      <section className="help-section" aria-labelledby="copy-title">
        <p className="section-number" aria-hidden="true">01</p>
        <div>
          <h2 id="copy-title">可以直接复制发送</h2>
          <blockquote className="copy-message">{helpMessage}</blockquote>
          <CopyHelpMessage message={helpMessage} />
          <p className="short-message">较短的版本：我现在不安全，需要你马上陪我。请给我打电话或来找我。</p>
        </div>
      </section>

      <section className="help-section" aria-labelledby="not-immediate-title">
        <p className="section-number" aria-hidden="true">02</p>
        <div>
          <h2 id="not-immediate-title">如果暂时没有立即危险</h2>
          <ul className="action-list quiet-list">
            <li>今天先不做不可逆的决定。</li>
            <li>把此刻的状态告诉至少一个现实中可信的人。</li>
            <li>尽快联系精神科、心理治疗师或其他合格的心理健康专业人员进行评估。</li>
            <li>和可信的人一起写下预警信号、能联系的人、能去的安全地点与紧急电话。</li>
          </ul>
          <p>你不需要等到情况“足够严重”才寻求帮助。</p>
        </div>
      </section>

      <section className="help-section" aria-labelledby="other-person-title">
        <p className="section-number" aria-hidden="true">03</p>
        <div>
          <h2 id="other-person-title">如果你担心身边的人</h2>
          <p>可以直接、平静地问：“你最近有没有想过伤害自己？你现在有没有具体计划或已经做了准备？”</p>
          <ul className="action-list quiet-list">
            <li>留在对方身边，或确保有可信的人陪伴。</li>
            <li>在保证自身安全的前提下，减少对方接触危险环境的机会。</li>
            <li>有立即危险时联系 120、110，或陪同前往医院急诊。</li>
            <li>不要答应替对方保守危及生命的秘密。</li>
          </ul>
          <blockquote className="support-quote">
            我相信你现在真的很痛苦。我们先一起保证你今晚的安全，再找专业的人来帮忙。
          </blockquote>
        </div>
      </section>

      <section className="help-section" aria-labelledby="contact-title">
        <p className="section-number" aria-hidden="true">04</p>
        <div>
          <h2 id="contact-title">联系站长</h2>
          <p>
            如果你对本站有任何问题，或正处在低谷、抑郁阶段，想找一个人说说此刻的感受，可以写信至{" "}
            <a className="contact-email" href="mailto:ii@deesuu.com">ii@deesuu.com</a>。你不必先把一切想清楚，也不必把文字整理得很完整。
          </p>
          <p>
            这里所能提供的是非实时的文字倾听、陪伴与语言抚慰，不能提供心理治疗、医学诊断或紧急危机干预，也不能替代专业帮助。
          </p>
          <p className="contact-safety">
            如果你已经有伤害自己或他人的打算、正在实施，或无法保证自己此刻安全，请不要等待邮件回复：立即拨打 120、110 或 12356，前往最近的医院急诊，并联系现实中可信的人陪在你身边。
          </p>
        </div>
      </section>

      <aside className="site-boundary" aria-labelledby="boundary-title">
        <h2 id="boundary-title">关于本站</h2>
        <p>
          文学与哲学可以陪伴我们理解痛苦，但不能替代精神科诊疗、心理治疗或紧急援助。本站不提供诊断、治疗或全天候危机干预。
        </p>
      </aside>
    </main>
  );
}
