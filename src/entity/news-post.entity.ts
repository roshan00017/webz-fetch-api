import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("news_posts")
export class NewsPost {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  uuid!: string;

  @Column({ nullable: true })
  url!: string;

  @Column({ nullable: true })
  ord_in_thread!: number;

  @Column({ nullable: true })
  parent_url!: string;

  @Column({ nullable: true })
  author!: string;

  @Column({ nullable: true })
  published!: string;

  @Column({ nullable: true })
  title!: string;

  @Column({ type: "text", nullable: true })
  text!: string;

  @Column({ type: "text", nullable: true })
  highlightText!: string;

  @Column({ type: "text", nullable: true })
  highlightTitle!: string;

  @Column({ type: "text", nullable: true })
  highlightThreadTitle!: string;

  @Column({ nullable: true })
  language!: string;

  @Column({ nullable: true })
  sentiment!: string;

  @Column("text", { array: true, nullable: true })
  categories!: string[];

  @Column("text", { array: true, nullable: true })
  external_links!: string[];

  @Column("text", { array: true, nullable: true })
  external_images!: string[];

  @Column("jsonb", { nullable: true })
  entities!: {
    persons: string[];
    organizations: string[];
    locations: string[];
  };

  @Column({ nullable: true })
  rating!: string;

  @Column({ nullable: true })
  crawled!: string;

  @Column({ nullable: true })
  updated!: string;

  @Column("jsonb", { nullable: true })
  thread!: {
    uuid: string;
    url: string;
    site_full: string;
    site: string;
    site_section: string;
    site_categories: string[];
    section_title: string;
    title: string;
    title_full: string;
    published: string;
    replies_count: number;
    participants_count: number;
    site_type: string;
    country: string;
    main_image: string;
    performance_score: number;
    domain_rank: number;
    domain_rank_updated: string;
    social: {
      updated: string;
      facebook: {
        likes: number;
        comments: number;
        shares: number;
      };
      vk: {
        shares: number;
      };
    };
  };
}
