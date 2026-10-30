export const courses = [
  {
    id: "administracao",
    title: "Administração e Aspectos Legais",
    shortTitle: "Administração e Legislação",
    area: "Gestão, pessoas e legislação",
    sourceDirectory: "1.0 - Administração e Aspectos Legais",
    expectedModules: 8,
    filters: [["all", "Todos"], ["Administração", "Administração"], ["Aspectos legais", "Aspectos legais"]],
    sourceNote: "Os arquivos fornecidos são apostilas. Algumas figuras anunciadas estão ausentes nos originais; esses trechos não foram reconstruídos com fontes externas.",
  },
  {
    id: "epidemiologia",
    title: "Epidemiologia Veterinária e Saneamento Ambiental",
    shortTitle: "Epidemiologia e Saneamento",
    area: "Saúde, ambiente e vigilância",
    sourceDirectory: "2.0 - Epidemiologia Veterinária e Saneamento Ambiental",
    expectedModules: 7,
    filters: [["all", "Todos"], ["Saúde e ambiente", "Saúde e ambiente"], ["Vigilância e epidemiologia", "Vigilância"], ["Alimentos e surtos", "Alimentos e surtos"]],
    sourceNote: "Foram fornecidos materiais das aulas 01, 02, 03, 05, 06, 07 e 08. O PDF da aula 04 não está entre os materiais recebidos. As referências usam a página física, incluindo capas. Dados históricos e divergências são identificados nas sínteses; não foram completados com fontes externas.",
  },
];
export const courseById = Object.assign(Object.create(null), Object.fromEntries(courses.map((c) => [c.id, c])));
