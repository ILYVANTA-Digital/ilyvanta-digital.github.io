import Image from "next/image";
import Link from "next/link";
import projects from "@/content/projects.json";
export function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <article className={`project-card project-${project.demo}`}>
      <Link
        href={`/work/${project.slug}/`}
        className="project-image"
        aria-label={`${project.category} — Read ${project.name} project study`}
      >
        <Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 100vw, 50vw" />
        <span className="image-tag">{project.category}</span>
        <span className="image-arrow" aria-hidden="true">
          ↗
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <span className="eyebrow">0{index + 1} / SELF-DIRECTED PROJECT</span>
          <h3>
            <Link href={`/work/${project.slug}/`}>{project.name}</Link>
          </h3>
          <p>{project.description}</p>
        </div>
        <a className="text-link" href={`/demo/${project.demo}/`}>
          Try sample demo <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
export function ProjectGrid() {
  return (
    <div className="project-grid">
      {projects.map((p, i) => (
        <ProjectCard key={p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
