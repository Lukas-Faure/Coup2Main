import { PrismaClient, Offre, User } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding...");

  await prisma.notification.deleteMany({});
  await prisma.rendezVous.deleteMany({});
  await prisma.message.deleteMany({});
  await prisma.favoris.deleteMany({});
  await prisma.offre.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.verificationToken.deleteMany({});

  const usersData = [
    {
      email: "marie.dupont@example.com",
      name: "Marie Dupont",
      image: "https://picsum.photos/150/150?random=1",
    },
    {
      email: "pierre.martin@example.com",
      name: "Pierre Martin",
      image: "https://picsum.photos/150/150?random=2",
    },
    {
      email: "sophie.bernard@example.com",
      name: "Sophie Bernard",
      image: "https://picsum.photos/150/150?random=3",
    },
    {
      email: "lucas.dubois@example.com",
      name: "Lucas Dubois",
      image: "https://picsum.photos/150/150?random=4",
    },
    {
      email: "chloe.petit@example.com",
      name: "Chloé Petit",
      image: "https://picsum.photos/150/150?random=5",
    },
    {
      email: "thomas.legrand@example.com",
      name: "Thomas Legrand",
      image: "https://picsum.photos/150/150?random=6",
    },
    {
      email: "emma.riviere@example.com",
      name: "Emma Rivière",
      image: "https://picsum.photos/150/150?random=7",
    },
    {
      email: "alex.durand@example.com",
      name: "Alex Durand",
      image: "https://picsum.photos/150/150?random=8",
    },
    {
      email: "lea.moreau@example.com",
      name: "Léa Moreau",
      image: "https://picsum.photos/150/150?random=9",
    },
    {
      email: "nicolas.girard@example.com",
      name: "Nicolas Girard",
      image: "https://picsum.photos/150/150?random=10",
    },
  ];

  const createdUsers: User[] = [];
  for (const userData of usersData) {
    const user = await prisma.user.create({ data: userData });
    createdUsers.push(user);
  }
  console.log(`✅ Créé ${createdUsers.length} utilisateurs`);

  const [user1, user2, user3, user4, user5, user6, user7, user8, user9, user10] = createdUsers;

  const offresData = [
    {
      title: "Aide pour déménagement à Paris",
      description: "Je propose mon aide pour porter des cartons et meubles. Disponible le weekend. J'ai un véhicule utilitaire. Je suis fort et fiable !",
      type: "proposition",
      category: "transport",
      location: "Paris 15ème",
      userId: user1.id,
    },
    {
      title: "Cours de cuisine italienne authentique",
      description: "Passionnée de cuisine italienne, je propose des cours privés pour apprendre à faire des pâtes fraîches, des sauces et des desserts traditionnels. Tous niveaux bienvenus !",
      type: "proposition",
      category: "cuisine",
      location: "Lyon 3ème",
      userId: user2.id,
    },
    {
      title: "Services de réparation informatique à domicile",
      description: "Informaticien expérimenté, je propose mes services pour réparer vos ordinateurs, installer des logiciels, résoudre les problèmes de réseau et d'optimisation. Diagnostic gratuit !",
      type: "proposition",
      category: "informatique",
      location: "Marseille 8ème",
      userId: user1.id,
    },
    {
      title: "Garde d'enfants occasionnelle et fiable",
      description: "Maman expérimentée, je propose de garder vos enfants occasionnellement, en soirée ou le weekend. Références vérifiables. Activités ludiques assurées !",
      type: "proposition",
      category: "garde",
      location: "Nantes",
      userId: user2.id,
    },
    {
      title: "Bricolage et petites réparations diverses",
      description: "Bricoleur polyvalent, je peux vous aider pour vos petites réparations : plomberie (fuites), électricité (prises), peinture, montage de meubles. Travail soigné et rapide.",
      type: "proposition",
      category: "bricolage",
      location: "Bordeaux",
      userId: user4.id,
    },
    {
      title: "Accompagnement courses pour seniors",
      description: "Je propose de faire les courses pour les personnes âgées ou à mobilité réduite dans mon quartier. Aide au transport et rangement. Gentillesse et patience garanties.",
      type: "proposition",
      category: "courses",
      location: "Nice",
      userId: user5.id,
    },
    {
      title: "Cours de guitare pour débutants et intermédiaires",
      description: "Je propose des cours de guitare acoustique et électrique pour tous âges et niveaux. Styles variés : pop, rock, blues, folk. Apprenez vos morceaux préférés !",
      type: "proposition",
      category: "musique",
      location: "Rennes",
      userId: user6.id,
    },
    {
      title: "Promenade de chiens et garde à la journée",
      description: "Amoureux des animaux, je propose de promener vos chiens pendant votre absence et de les garder à mon domicile si besoin. Parc à proximité, beaucoup d'amour à donner !",
      type: "proposition",
      category: "animaux",
      location: "Toulon",
      userId: user7.id,
    },
    {
      title: "Création de site web vitrine pour TPE/PME",
      description: "Développeur web freelance, je peux créer un site web vitrine simple, moderne et responsive pour votre activité ou association. Tarifs abordables et devis rapide.",
      type: "proposition",
      category: "informatique",
      location: "Montpellier",
      userId: user8.id,
    },
    {
      title: "Soutien scolaire en math et physique (collège/lycée)",
      description: "Étudiante en sciences, je propose des cours de soutien scolaire personnalisés en mathématiques et physique pour les collégiens et lycéens. Aide aux devoirs et préparation aux examens.",
      type: "proposition",
      category: "soutien scolaire",
      location: "Lille",
      userId: user9.id,
    },
    {
      title: "Nettoyage de vitres et entretien de vérandas",
      description: "Service de nettoyage professionnel pour vitres, baies vitrées, vérandas. J'utilise des produits écologiques et garantis une propreté impeccable. Devis gratuit !",
      type: "proposition",
      category: "menage",
      location: "Nice",
      userId: user10.id,
    },

    {
      title: "Recherche aide jardinage pour grand jardin",
      description: "Je cherche quelqu'un pour m'aider à entretenir mon grand jardin : taille des haies, tonte, plantation, désherbage. Matériel fourni. Urgent !",
      type: "demande",
      category: "jardinage",
      location: "Toulouse",
      userId: user3.id,
    },
    {
      title: "Besoin d'aide pour ménage de printemps",
      description: "Je recherche une personne de confiance pour m'aider avec le grand ménage de printemps de ma maison. Environ 4-5 heures de travail. Flexible sur les horaires.",
      type: "demande",
      category: "menage",
      location: "Strasbourg",
      userId: user4.id,
    },
    {
      title: "Demande de cours de dessin pour débutant",
      description: "Je souhaiterais prendre des cours de dessin (base) pour apprendre les techniques de croquis et d'illustration. Flexible sur les jours et horaires.",
      type: "demande",
      category: "art",
      location: "Paris 12ème",
      userId: user5.id,
    },
    {
      title: "Cherche aide pour petits travaux de plomberie",
      description: "J'ai une petite fuite sous l'évier et j'aurais besoin d'un coup de main pour la réparer. Je suis à la recherche d'un bricoleur.",
      type: "demande",
      category: "bricolage",
      location: "Lyon 7ème",
      userId: user6.id,
    },
    {
      title: "Recherche professeur de yoga à domicile",
      description: "Je recherche un professeur de yoga pour des cours particuliers à domicile (débutant). Préférence pour le yoga Vinyasa. Deux fois par semaine.",
      type: "demande",
      category: "sport",
      location: "Nice",
      userId: user7.id,
    },
    {
      title: "Besoin d'un coup de main pour rédiger un CV",
      description: "Je suis à la recherche d'une personne pour m'aider à rédiger un CV percutant et une lettre de motivation. Je suis jeune diplômé.",
      type: "demande",
      category: "services",
      location: "Bordeaux",
      userId: user8.id,
    },
    {
      title: "Recherche aide pour emballage cartons déménagement",
      description: "J'ai besoin d'aide pour emballer mes affaires dans des cartons avant un déménagement. Je fournis le matériel. Travail minutieux.",
      type: "demande",
      category: "transport",
      location: "Rennes",
      userId: user9.id,
    },
    {
      title: "Cherche développeur pour petit projet web",
      description: "Je recherche un développeur pour m'aider à concrétiser une idée de petit site web personnel. C'est un projet éducatif simple.",
      type: "demande",
      category: "informatique",
      location: "Montpellier",
      userId: user10.id,
    },
  ];

  const createdOffres: Offre[] = [];
  for (const offreData of offresData) {
    const offre = await prisma.offre.create({ data: offreData });
    createdOffres.push(offre);
  }
  console.log(`✅ Créé ${createdOffres.length} offres`);

  const messagesData = [
    {
      fromUserId: user1.id,
      toUserId: user2.id,
      content: "Bonjour Pierre, je suis très intéressée par vos cours de cuisine italienne. Seriez-vous disponible en soirée la semaine prochaine ?",
      offreId: createdOffres[1].id,
    },
    {
      fromUserId: user2.id,
      toUserId: user1.id,
      content: "Bonjour Marie, oui bien sûr ! Mardi ou jeudi soir me conviennent. Quelle heure serait idéale pour vous ?",
      offreId: createdOffres[1].id,
    },
    {
      fromUserId: user1.id,
      toUserId: user2.id,
      content: "Je préférerais mardi si possible. Commençons par les bases : pâtes fraîches ! Impatiente d'apprendre.",
      offreId: createdOffres[1].id,
    },

    {
      fromUserId: user3.id,
      toUserId: user1.id,
      content: "Bonjour Marie, j'ai vu votre annonce pour l'aide au déménagement. J'ai un petit appartement à vider ce samedi. Ça vous intéresse ?",
      offreId: createdOffres[0].id,
    },
    {
      fromUserId: user1.id,
      toUserId: user3.id,
      content: "Bonjour Sophie, oui, je suis disponible samedi matin. Quel est l'étage et le volume estimé ?",
      offreId: createdOffres[0].id,
    },

    {
      fromUserId: user4.id,
      toUserId: user3.id,
      content: "Bonjour Sophie, j'ai vu votre demande d'aide pour le jardin. Je suis paysagiste et disponible ce weekend. Pouvons-nous en discuter ?",
      offreId: createdOffres[11].id,
    },
    {
      fromUserId: user3.id,
      toUserId: user4.id,
      content: "Bonjour Lucas, oui avec plaisir ! Mon jardin est assez grand, il y a de la taille de haie, de la tonte... Quand seriez-vous libre pour un devis ?",
      offreId: createdOffres[11].id,
    },

    {
      fromUserId: user5.id,
      toUserId: user8.id,
      content: "Bonjour Alex, votre proposition de création de site web m'intéresse. Je voudrais un petit site pour ma galerie d'art en ligne.",
      offreId: createdOffres[8].id,
    },
    {
      fromUserId: user8.id,
      toUserId: user5.id,
      content: "Bonjour Chloé, très bien. Je peux vous faire une proposition rapidement. Avez-vous déjà des exemples de sites que vous aimez ?",
      offreId: createdOffres[8].id,
    },
    {
      fromUserId: user5.id,
      toUserId: user8.id,
      content: "Oui, j'ai quelques références. On peut en discuter de vive voix ?",
      read: true,
      offreId: createdOffres[8].id,
    },

    {
      fromUserId: user10.id,
      toUserId: user4.id,
      content: "Bonjour Lucas, j'ai vu votre annonce pour l'aide au ménage de printemps. Je suis disponible dès la semaine prochaine. Quel jour vous conviendrait ?",
      offreId: createdOffres[12].id,
    },
  ];

  for (const messageData of messagesData) {
    await prisma.message.create({ data: messageData });
  }
  console.log(`✅ Créé ${messagesData.length} messages`);

  const rendezvousData = [
    {
      userId: user1.id,
      offreId: createdOffres[1].id,
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      statut: "confirme",
      demandeurAccepte: true,
      offreurAccepte: true,
      message: "Rendez-vous confirmé pour le cours de cuisine mardi soir.",
    },
    {
      userId: user3.id,
      offreId: createdOffres[11].id,
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      statut: "en_attente",
      demandeurAccepte: true,
      offreurAccepte: false,
      message: "Je vous propose cette date pour l'aide au jardinage.",
    },
    {
      userId: user4.id,
      offreId: createdOffres[12].id,
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      statut: "refuse",
      demandeurAccepte: true,
      offreurAccepte: false,
      lastModifiedBy: user4.id,
      message: "Désolé, cette date ne me convient pas.",
    },
    {
      userId: user7.id,
      offreId: createdOffres[7].id,
      date: new Date(new Date().setDate(new Date().getDate() + 10)),
      statut: "en_attente",
      demandeurAccepte: false,
      offreurAccepte: false,
      message: "Propose des créneaux pour les promenades de vos chiens.",
    },
  ];

  for (const rvData of rendezvousData) {
    await prisma.rendezVous.create({ data: rvData });
  }
  console.log(`✅ Créé ${rendezvousData.length} rendez-vous`);

  const favorisData = [
    {
      userId: user1.id,
      offreId: createdOffres[11].id,
    },
    {
      userId: user2.id,
      offreId: createdOffres[0].id,
    },
    {
      userId: user3.id,
      offreId: createdOffres[1].id,
    },
    {
      userId: user6.id,
      offreId: createdOffres[8].id,
    },
    {
      userId: user9.id,
      offreId: createdOffres[7].id,
    },
  ];

  for (const favoriData of favorisData) {
    await prisma.favoris.create({ data: favoriData });
  }
  console.log(`✅ Créé ${favorisData.length} favoris`);

  const notificationsData = [
    {
      userId: user1.id,
      type: "message_recu",
      title: "Nouveau message",
      message: "Vous avez un nouveau message de Pierre concernant vos cours de cuisine.",
      read: false,
      data: JSON.stringify({ offreId: createdOffres[1].id, fromUserId: user2.id }),
    },
    {
      userId: user3.id,
      type: "rendezvous_demande",
      title: "Nouvelle demande de rendez-vous",
      message: "Lucas a demandé un rendez-vous pour votre offre de jardinage.",
      read: false,
      data: JSON.stringify({ offreId: createdOffres[11].id, userId: user4.id }),
    },
    {
      userId: user4.id,
      type: "rendezvous_refuse",
      title: "Rendez-vous refusé",
      message: "Votre demande de rendez-vous pour l'aide ménage a été refusée par Chloé.",
      read: true,
      data: JSON.stringify({ offreId: createdOffres[12].id, userId: user10.id }),
    },
    {
      userId: user8.id,
      type: "offre_aimée",
      title: "Offre ajoutée aux favoris",
      message: "Léa a ajouté votre offre de création de site web à ses favoris !",
      read: false,
      data: JSON.stringify({ offreId: createdOffres[8].id, userId: user5.id }),
    },
  ];

  for (const notificationData of notificationsData) {
    await prisma.notification.create({ data: notificationData });
  }
  console.log(`✅ Créé ${notificationsData.length} notifications`);

  console.log("✅ Seeding terminé !");
  console.log(`Créé ${createdOffres.length} offres pour ${createdUsers.length} utilisateurs`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
