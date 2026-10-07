import type {
  EmbedField,
  GroupField,
  ImageField,
  KeyTextField,
  NumberField,
  PrismicDocumentWithUID,
  RichTextField,
} from "@prismicio/client";

export type RolesGroupItem = {
  role: KeyTextField;
};

export type GalleryItem = {
  image: ImageField;
};

export type ProjectDocumentData = {
  miniatura: ImageField;
  title: RichTextField;
  client_name: KeyTextField;
  year: NumberField;
  roles_group: GroupField<RolesGroupItem>;
  category: KeyTextField;
  url_video: EmbedField;
  main_image: ImageField;
  first_text: RichTextField;
  second_text: RichTextField;
  gallery: GroupField<GalleryItem>;
};

export type ProjectDocument = PrismicDocumentWithUID<
  ProjectDocumentData,
  "projects"
>;
