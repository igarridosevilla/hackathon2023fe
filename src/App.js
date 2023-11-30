import * as React from "react";

import CenteredGrid from "./components/CenteredGrid";

const App = () => {
  const agents = [
    {
      avatar: {
        alt: "d2c Agent Avatar",
        src: "https://static.coverwallet.com/logos-catalog/agent-avatar-495987bb-e03e-4344-8add-81093d6f76b4.png",
      },
      name: "Chris",
      description: "Your Bot Advisor",
      phone: "(646) 844-9933",
      phoneIcon: true,
      email: false,
      emailIcon: true,
    },
    {
      avatar: {
        alt: "d2c Agent Avatar",
        src: "https://www.intelligentinsurer.com/media/image/roberto-pinto-president-of-digital-client-solutions-at-aon-1.jpg",
      },
      name: "Roberto Pinto",
      description: "Your Boss Advisor",
      phone: "(646) 844-9933",
      phoneIcon: true,
      email: false,
      emailIcon: true,
    },
    {
      avatar: {
        alt: "d2c Agent Avatar",
        src: "https://images.news18.com/ibnlive/uploads/2022/12/cristiano-ronaldo-ap-8.jpg",
      },
      name: "El bicho",
      description: "Your bicho Advisor",
      phone: "(646) 844-9933",
      phoneIcon: true,
      email: false,
      emailIcon: true,
    },
    {
      avatar: {
        alt: "d2c Agent Avatar",
        src: "https://www.looper.com/img/gallery/the-office-stars-reveal-the-hilarious-true-story-behind-the-famous-michael-meme/intro-1683470325.jpg",
      },
      name: "Michael Scott",
      description: "Your best boss Advisor",
      phone: "(646) 844-9933",
      phoneIcon: true,
      email: false,
      emailIcon: true,
    },
    {
      avatar: {
        alt: "d2c Agent Avatar",
        src: "https://ca.slack-edge.com/E0306D3MK0A-U03DTN9Q7T8-849a4913e599-512",
      },
      name: "Juan Vera",
      description: "Your Tech Director Advisor",
      phone: "(646) 844-9933",
      phoneIcon: true,
      email: false,
      emailIcon: true,
    },
  ];
  const agent = window.location.href.charAt(window.location.href.length - 1);

  return <CenteredGrid agentUser={agents[agent]} />;
};

export default App;
