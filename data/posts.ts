export type Section = "fragments" | "cosmic-walk";

type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

type HeadingBlock = {
  type: "heading";
  text: string;
};

type QuoteBlock = {
  type: "quote";
  text: string;
  cite?: string;
};

export type ContentBlock = ParagraphBlock | HeadingBlock | QuoteBlock;

export type Post = {
  slug: string;
  section: Section;
  title: string;
  date: string;
  demo?: boolean;
  blocks: ContentBlock[];
};

export const sectionConfig: Record<Section, { label: string; href: string }> = {
  fragments: {
    label: "日记碎片",
    href: "/fragments/"
  },
  "cosmic-walk": {
    label: "宇宙漫步",
    href: "/cosmic-walk/"
  }
};

export const posts: Post[] = [
  {
    slug: "an-ordinary-afternoon",
    section: "fragments",
    title: "一个普通下午",
    date: "2026-08-23",
    demo: true,
    blocks: [
      {
        type: "paragraph",
        text: "这是为验证阅读版式而写的示例文字，不来自私人聊天记录。正式发布前，它会被真正的生活日记替换。"
      },
      {
        type: "paragraph",
        text: "今天没有发生值得被写进编年史的事情。云层很低，杯子里的水逐渐变凉，窗外偶尔传来车经过湿地面的声音。"
      },
      {
        type: "paragraph",
        text: "过去我总觉得，一天必须留下些什么才不算浪费。后来才发现，时间并不会因为没有成为故事就停止存在。一个普通下午也可以只是一个普通下午。"
      }
    ]
  },
  {
    slug: "after-walking-the-coast",
    section: "fragments",
    title: "沿海岸线走过以后",
    date: "2026-08-17",
    demo: true,
    blocks: [
      {
        type: "paragraph",
        text: "这是日记栏目中的第二篇版式示例。它只验证较短段落、移动端换行与页面留白。"
      },
      {
        type: "paragraph",
        text: "离开熟悉的语言环境以后，人会短暂地失去那些被反复解释过的身份。陌生城市并没有给出答案，却允许一个人暂时不回答。"
      }
    ]
  },
  {
    slug: "let-the-future-object",
    section: "cosmic-walk",
    title: "请允许未来的我反对今天",
    date: "2026-08-22",
    demo: true,
    blocks: [
      {
        type: "paragraph",
        text: "现在的我拥有截至今天的记忆，却没有未来将会获得的全部事实。未来的我会遇见尚未出现的人、读到尚未翻开的书，也会重新解释今天。"
      },
      {
        type: "heading",
        text: "决定与判决并不相同"
      },
      {
        type: "paragraph",
        text: "我们当然需要替未来作决定：保存一点钱，选择一条路，离开或者留下。但不可逆的最终判决不同。它要求今天的我假定，所有尚未发生的经验都不可能改变结论。"
      },
      {
        type: "quote",
        text: "今天的绝望，并不拥有未来的全部证据。"
      },
      {
        type: "paragraph",
        text: "这不是关于生命终极意义的证明，只是一条审慎原则：在证据仍然不完整的时候，为未来保留反对今天的权利。"
      }
    ]
  },
  {
    slug: "object-exceeds-its-name",
    section: "cosmic-walk",
    title: "对象为何总是超出它的名字",
    date: "2026-08-18",
    demo: true,
    blocks: [
      {
        type: "paragraph",
        text: "我们用名字接近事物：恒星有编号，痛苦有诊断，某段生活被称为失败。名称让经验能够被交流，也很容易伪装成经验本身。"
      },
      {
        type: "heading",
        text: "名称不是终点"
      },
      {
        type: "paragraph",
        text: "一颗恒星在获得编号以前已经燃烧了很久；一个人也总有尚未进入自我描述的部分。对象不会因为我们完成了定义，就停止变化。"
      },
      {
        type: "quote",
        text: "对象没有义务服从我们给它的最后解释。"
      },
      {
        type: "paragraph",
        text: "承认这种剩余，并不是取消判断，而是把判断放回可以修订的位置：语言暂时抵达这里，事物仍在继续。"
      }
    ]
  }
];

export function getPostsBySection(section: Section) {
  return posts
    .filter((post) => post.section === section)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}
