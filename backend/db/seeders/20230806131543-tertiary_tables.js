"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("volunteers", [
      {
        user_id: 1,
        target_comm_id: 3,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 2,
        target_comm_id: 6,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 3,
        target_comm_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 4,
        target_comm_id: 2,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 5,
        target_comm_id: 4,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 6,
        target_comm_id: 5,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("projects", [
      {
        user_id: 7,
        target_comm_id: 6,
        title: "Inclusive Community Garden Day",
        description:
          "Join us for a day of gardening and community-building at our Inclusive Community Garden Day! Volunteers of all backgrounds are welcome to come together and contribute to the maintenance and development of our community garden. This event aims to promote inclusivity by providing a space where people from different walks of life can connect while caring for nature. Volunteers will engage in various gardening activities, such as planting, weeding, and watering, while sharing stories and experiences. Through this event, we strive to cultivate not only plants but also friendships and a sense of belonging in our diverse community.",
        location: "Australia",
        start_date: "2023-02-16T08:00:00.000Z",
        end_date: "2023-02-16T10:00:00.000Z",
        volunteers_required: "8",
        image:
          "https://images.unsplash.com/photo-1524247108137-732e0f642303?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 7,
        target_comm_id: 6,
        title: "Rising Together: Flood Relief Initiative",
        description:
          "When the waters rise, so do our spirits of compassion and unity. Join us for the \"Rising Together: Flood Relief Initiative\" as we extend a lifeline to those affected by flooding. Our dedicated team, armed with supplies and support, will provide essential relief to families grappling with the aftermath of nature's fury. Through distribution of clean water, food, shelter materials, and hygiene kits, we aim to restore a sense of security and dignity to those in distress. Let's stand as a beacon of hope, proving that humanity's strength shines brightest amidst adversity. Your involvement can turn despair into hope and make a lasting impact on lives in need. Together, we'll navigate these troubled waters and rebuild communities stronger than ever before.",
        location: "India",
        start_date: "2023-06-10T08:00:00.000Z",
        end_date: "2023-06-10T16:00:00.000Z",
        volunteers_required: "36",
        image:
          "https://firebasestorage.googleapis.com/v0/b/handshake-ac26e.appspot.com/o/project%2Fphoto-1590874023110-f82d4c63b599.avif?alt=media&token=33faa180-5a34-4d42-b83b-c23b9b6a80c1",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 7,
        target_comm_id: 6,
        title: "Cultural Diversity Fair",
        description:
          "Join us for the Cultural Diversity Fair, a celebration of different cultures that make our community vibrant and harmonious. Volunteers will collaborate to set up booths representing various cultures, offering traditional foods, crafts, and activities. The event aims to bridge cultural gaps and foster understanding among diverse groups. Volunteers will assist with organizing the fair, guiding attendees, and facilitating cultural exchange activities. Through this event, we strive to create an inclusive environment where everyone can learn from and appreciate each other's heritage.",
        location: "Singapore",
        start_date: "2023-08-08T10:00:00.000Z",
        end_date: "2023-08-08T15:00:00.000Z",
        volunteers_required: "18",
        image:
          "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 7,
        target_comm_id: 6,
        title: "Sports Day with Migrant Workers!",
        description:
          'Join us for an inspiring and heartwarming day of camaraderie and sportsmanship at the "Celebrating Unity Through Sports - Migrant Workers Sports Day." This event is a unique opportunity to bridge cultures, foster understanding, and promote inclusivity by bringing together local communities and migrant workers for a day of fun, competition, and celebration.\n\nHighlights of the Event:\n1. Sports Galore: Prepare to witness an array of exciting sports and games where teams comprised of migrant workers and local residents will showcase their talents and team spirit. From football to tug-of-war, relay races to sack races, there\'s a sporting challenge for everyone.\n\n2. Cultural Exchange: Immerse yourself in a vibrant exchange of cultures as participants share their traditions, stories, and experiences. This is a chance to learn about different backgrounds and build connections that transcend language and borders.\n\n3. Food and Music: Indulge in a delectable spread of international cuisines, reflecting the diverse backgrounds of the participants. Live music performances will create a festive atmosphere, fostering a sense of togetherness and harmony.\n\n4. Community Building: Engage in interactive workshops and activities designed to promote teamwork, empathy, and understanding. Break down barriers and forge friendships that extend beyond the event.\n\n5. Recognition and Awards: Celebrate the achievements and contributions of migrant workers to the community through a closing ceremony that honors outstanding performances and displays of sportsmanship.',
        location: "Singapore",
        start_date: "2023-12-23T10:00:00.000Z",
        end_date: "2023-12-23T15:00:00.000Z",
        volunteers_required: "20",
        image:
          "https://firebasestorage.googleapis.com/v0/b/handshake-ac26e.appspot.com/o/project%2Fphoto-1593436878396-e943a3cac98f.avif?alt=media&token=6db5095a-529e-4944-8b13-9588a62505a6",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 7,
        target_comm_id: 6,
        title: "Caring for Bali: COVID-19 Relief Kit Distribution Drive",
        description:
          "In these challenging times, solidarity and compassion matter more than ever. Join us for a heartwarming initiative - the \"Caring for Bali: COVID-19 Relief Kit Distribution Drive.\" Together, we'll extend a helping hand to those in need by distributing essential COVID-19 relief kits. These kits, comprising masks, sanitizers, and informational materials, will empower local communities with knowledge and resources to stay safe. Let's stand together as a beacon of hope, making a positive impact on lives across Bali. Your participation can spark a chain reaction of kindness that will resonate for generations to come. Together, we can make a difference, one care package at a time.",
        location: "Indonesia",
        start_date: "2024-06-15T09:00:00.000Z",
        end_date: "2024-06-15T16:00:00.000Z",
        volunteers_required: "30",
        image:
          "https://firebasestorage.googleapis.com/v0/b/handshake-ac26e.appspot.com/o/project%2Fphoto-1615897570286-da936a5dfb81.avif?alt=media&token=3a64d790-2fa9-42ed-a097-93e86b4b3cc0",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 7,
        target_comm_id: 6,
        title: "Cultural Awareness Fair",
        description:
          "Volunteer at a fair that showcases different cultures, traditions, and cuisines. Volunteers will help set up booths and engage attendees in learning about global diversity.",
        location: "Singapore",
        start_date: "2023-12-03T10:00:00.000Z",
        end_date: "2023-12-03T16:00:00.000Z",
        volunteers_required: "8",
        image:
          "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        target_comm_id: 3,
        title: "Stray Animal Rescue and Relocation",
        description:
          "Assist in rescuing stray animals in distress and relocating them to safer areas or shelters.",
        location: "Singapore",
        start_date: "2023-07-10T10:00:00.000Z",
        end_date: "2023-07-10T12:00:00.000Z",
        volunteers_required: "8",
        image:
          "https://images.unsplash.com/photo-1553434133-96822a8e94af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1465&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        target_comm_id: 3,
        title: "Stray Animal Shelter Clean-Up Day",
        description:
          "Join us for a day of giving back to our furry friends! Volunteers will assist in cleaning and organizing our stray animal shelter to provide a comfortable and safe environment for the animals awaiting adoption. Tasks include cleaning kennels, grooming, and providing social interaction to these animals in need. Let's work together to make their stay as pleasant as possible.",
        location: "Singapore",
        start_date: "2023-05-20T09:00:00.000Z",
        end_date: "2023-05-20T16:00:00.000Z",
        volunteers_required: "15",
        image:
          "https://images.unsplash.com/photo-1542715234-4bafcfc68bd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        target_comm_id: 3,
        title: "Wildlife Habitat Restoration Project",
        description:
          "Join us in preserving local wildlife habitats! Volunteers will engage in habitat restoration activities, such as planting native vegetation, building birdhouses, and creating safe spaces for animals. By enhancing natural environments, we can help maintain ecosystems and protect various species of animals.",
        location: "New Zealand",
        start_date: "2023-01-18T09:00:00.000Z",
        end_date: "2023-01-18T16:00:00.000Z",
        volunteers_required: "15",
        image:
          "https://images.unsplash.com/photo-1542715234-4bafcfc68bd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        target_comm_id: 3,
        title: "Pet Adoption Drive",
        description:
          "Help find forever homes for our adorable furry companions! Volunteers will assist in organizing a pet adoption drive where potential adopters can meet and interact with rescue animals. Volunteers will help set up booths, provide information about the animals, and ensure a smooth adoption process. Your efforts can make a significant difference in finding loving families for these animals.",
        location: "Singapore",
        start_date: "2024-02-10T09:00:00.000Z",
        end_date: "2024-02-10T18:00:00.000Z",
        volunteers_required: "6",
        image:
          "https://images.unsplash.com/photo-1529217934401-a6c268e2c2a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        target_comm_id: 3,
        title: "Animal Food Drive for Shelters",
        description:
          "Support local animal shelters by participating in our animal food drive! Volunteers will collect and sort donated pet food, treats, and supplies to benefit shelters in need. Your contributions will help provide nourishment and comfort to animals awaiting their forever homes.",
        location: "Malaysia",
        start_date: "2023-12-18T09:00:00.000Z",
        end_date: "2023-12-18T18:00:00.000Z",
        volunteers_required: "6",
        image:
          "https://images.unsplash.com/photo-1583787317796-2bc56f8556e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        target_comm_id: 3,
        title: "Stray Animal Health Check-Up Clinic",
        description:
          "Make a difference in the lives of stray animals by participating in our health check-up clinic! Volunteers will assist veterinary professionals in providing health assessments, vaccinations, and basic treatments to stray animals. Your care and attention can contribute to improving the well-being of these animals.",
        location: "Singapore",
        start_date: "2023-10-15T10:00:00.000Z",
        end_date: "2023-10-15T13:00:00.000Z",
        volunteers_required: "3",
        image:
          "https://images.unsplash.com/photo-1553688738-a278b9f063e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 9,
        target_comm_id: 5,
        title: "Adaptive Sports Day",
        description:
          "Join us for a day of inclusive sports and activities designed for individuals with disabilities. Volunteers will assist participants in various sports and games, ensuring everyone has a chance to enjoy and excel.",
        location: "Singapore",
        start_date: "2023-03-15T13:00:00.000Z",
        end_date: "2023-03-15T16:00:00.000Z",
        volunteers_required: "8",
        image:
          "https://images.unsplash.com/photo-1519053450113-32bed8bbf61d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 9,
        target_comm_id: 5,
        title: "Art Therapy Workshop",
        description:
          "Help facilitate an art therapy workshop for individuals with disabilities. Volunteers will guide participants in creative activities that promote self-expression and provide a supportive environment for personal growth.",
        location: "Singapore",
        start_date: "2024-04-16T13:00:00.000Z",
        end_date: "2024-04-16T18:00:00.000Z",
        volunteers_required: "4",
        image:
          "https://images.unsplash.com/photo-1607211851821-8be3cd6146f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 10,
        target_comm_id: 2,
        title: "Youth Leadership Summit",
        description:
          "Volunteer at a youth leadership summit where young people can develop leadership skills, participate in workshops, and collaborate on projects that address community challenges.",
        location: "Singapore",
        start_date: "2023-03-15T09:00:00.000Z",
        end_date: "2023-03-15T18:00:00.000Z",
        volunteers_required: "9",
        image:
          "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 10,
        target_comm_id: 2,
        title: "Digital Literacy Training for Youth",
        description:
          "In a rapidly advancing digital world, access to technology and digital literacy skills are essential. Volunteer to provide digital literacy training to youth in African communities, teaching them how to use computers, navigate the internet, and utilize various software applications. Your efforts will bridge the digital divide and empower these youth to access educational resources, job opportunities, and connect with the global community.",
        location: "Africa",
        start_date: "2024-07-05T09:00:00.000Z",
        end_date: "2024-07-05T18:00:00.000Z",
        volunteers_required: "25",
        image:
          "https://images.unsplash.com/photo-1543689604-6fe8dbcd1f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 10,
        target_comm_id: 2,
        title: "Education Empowerment Initiative",
        description:
          "Join our initiative to provide quality education and mentorship to youth in underserved communities across Africa. As a volunteer, you'll have the opportunity to tutor, mentor, and support young learners in subjects like math, science, language, and life skills. Your guidance and encouragement will help empower these youth to overcome educational barriers and build a brighter future for themselves. By volunteering your time, you contribute to breaking the cycle of poverty and unlocking opportunities for these eager minds.",
        location: "Africa",
        start_date: "2024-10-25T09:00:00.000Z",
        end_date: "2024-10-25T18:00:00.000Z",
        volunteers_required: "18",
        image:
          "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 10,
        target_comm_id: 2,
        title: "Teach Code to Less Privileged Children/Youths",
        description:
          "Our initiative, 'Teach Code to Less Privileged Children/Youths!', is a noble endeavor aimed at bridging the digital divide and fostering opportunities for underserved young minds. Through engaging and interactive coding workshops, we empower children and youths with the essential skills needed to navigate the digital age. By unlocking the world of programming, we open doors to creativity, innovation, and future success. Join us in shaping a brighter tomorrow for these talented individuals. Together, we can transform lives, one line of code at a time.",
        location: "Singapore",
        start_date: "2024-02-02T10:00:00.000Z",
        end_date: "2024-02-02T13:00:00.000Z",
        volunteers_required: "6",
        image:
          "https://images.unsplash.com/photo-1565350831386-8c52421af9fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 11,
        target_comm_id: 4,
        title:
          "Reviving Our Natural Haven: Environment Conservation Volunteering Project",
        description:
          "Join us in our exciting environment conservation volunteering project, where we aim to revive and protect our local natural haven! As part of this initiative, we will be organizing tree planting activities, conducting wildlife habitat restoration, and engaging in cleanup drives to ensure the preservation of our precious ecosystem.",
        location: "Singapore",
        start_date: "2023-06-08T09:00:00.000Z",
        end_date: "2023-06-08T12:00:00.000Z",
        volunteers_required: "8",
        image:
          "https://images.unsplash.com/photo-1611843467160-25afb8df1074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 11,
        target_comm_id: 4,
        title: "Community Clean-Up Initiative",
        description:
          "Join us in making a positive impact on our local community by participating in a community clean-up initiative. We'll be working together to clean up parks, streets, and public spaces, contributing to a cleaner and greener environment for everyone. All volunteers are welcome to join us in this rewarding and meaningful project. Let's come together and create a cleaner, more beautiful community for everyone to enjoy!",
        location: "Australia",
        start_date: "2023-07-12T07:00:00.000Z",
        end_date: "2023-07-12T12:00:00.000Z",
        volunteers_required: "12",
        image:
          "https://images.unsplash.com/photo-1617358452668-1a47fde02538?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 11,
        target_comm_id: 4,
        title: "Eco-Friendly Workshops",
        description:
          "Assist in organizing workshops on sustainable living practices. Volunteers will educate participants on topics such as composting, reducing plastic waste, and energy conservation.",
        location: "Singapore",
        start_date: "2023-01-10T13:00:00.000Z",
        end_date: "2023-01-10T15:00:00.000Z",
        volunteers_required: "3",
        image:
          "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 11,
        target_comm_id: 4,
        title: "Green Earth Cleanup Campaign",
        description:
          "Join us in our efforts to create a cleaner and greener environment. This volunteering project focuses on cleaning up local parks, streets, and public areas. Together, we can make a positive impact on the community and promote sustainable living. Let's work hand in hand for a healthier planet!",
        location: "Indonesia",
        start_date: "2024-05-25T07:00:00.000Z",
        end_date: "2024-05-25T11:00:00.000Z",
        volunteers_required: "18",
        image:
          "https://images.unsplash.com/photo-1537084642907-629340c7e59c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 11,
        target_comm_id: 4,
        title: "Brighton Beach Cleaning",
        description:
          "Join us for a night of environmental action and community camaraderie at our Beach Cleaning Extravaganza - an event dedicated to preserving the beauty of our coastline. As Shoreline Guardians, we'll unite to restore the splendor of our beloved beach. Armed with gloves, bags, and a shared passion for the environment, we'll comb the sands, collecting debris and litter that threaten marine life and ecosystems. Together, we'll make a tangible impact, fostering a cleaner, healthier shoreline for all to enjoy. Be a part of the solution and let's make waves of positive change together!",
        location: "Australia",
        start_date: "2023-12-09T08:00:00.000Z",
        end_date: "2023-12-09T12:00:00.000Z",
        volunteers_required: "28",
        image:
          "https://firebasestorage.googleapis.com/v0/b/handshake-ac26e.appspot.com/o/project%2Fphoto-1618477461853-cf6ed80faba5.avif?alt=media&token=ff9db6f9-47d8-47bf-8266-5c5f4c7561c0",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 11,
        target_comm_id: 4,
        title: "Rebirth from Ashes: Forest Fire Relief Drive",
        description:
          "Amidst the devastation of raging forest fires, a flame of compassion ignites. Join us for the \"Rebirth from Ashes: Forest Fire Relief Drive\" - an unwavering response to nature's fury. Together, we'll extend a healing touch to affected communities, providing vital relief including food, shelter, and medical aid. Through this collective effort, we aim to restore hope, rebuild lives, and rejuvenate the charred landscapes. Let's stand united against the flames of despair, showing that our bonds are stronger than the fire's grip. Your participation can sow seeds of recovery, nurturing a brighter future for both people and nature. Join us as we rise from the ashes, stronger and more resilient than before.",
        location: "Canada",
        start_date: "2023-11-02T09:00:00.000Z",
        end_date: "2023-11-02T18:00:00.000Z",
        volunteers_required: "76",
        image:
          "https://firebasestorage.googleapis.com/v0/b/handshake-ac26e.appspot.com/o/project%2Fphoto-1578652229330-05f320786aa9.avif?alt=media&token=4ec8ab51-60ac-40e2-8102-7c08767ab8e2",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("volunteer_projects", [
      {
        user_id: 1,
        project_id: 7,
        role_id: 1,
        status_id: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("liked_projects", [
      {
        user_id: 1,
        project_id: 7,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("communications", [
      {
        user_id: 8,
        project_id: 10,
        title: "Getting to the venue",
        description:
          "Nearest MRT stop: Bendemeer MRT (Downtown Line). Take Exit B, and follow the escalator until you see Bendemeer Market. Once you see the market, take a right and you will see this huge sheltered foyer area, which will be our meet-up point.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
    await queryInterface.bulkInsert("comments", [
      {
        user_id: 1,
        communication_id: 1,
        text: "Can I check if slippers will be allowed?",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        user_id: 8,
        communication_id: 1,
        text: "Hey John! Sorry, but only covered shoes will be allowed at this event.",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments");
    await queryInterface.bulkDelete("communications");
    await queryInterface.bulkDelete("liked_projects");
    await queryInterface.bulkDelete("volunteer_projects");
    await queryInterface.bulkDelete("projects");
    await queryInterface.bulkDelete("volunteers");
  },
};
