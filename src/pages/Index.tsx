
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ReportAds } from "@/components/ReportAds";
import { ReportContent } from "@/components/ReportContent";
import { CafeManagement } from "@/components/CafeManagement";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCafe, setSelectedCafe] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const cafes = [
    { id: "1", name: "Kafe Santai" },
    { id: "2", name: "Coffee Corner" },
    { id: "3", name: "Warung Kopi Asik" }
  ];

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return (
          <DashboardOverview 
            selectedCafe={selectedCafe}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            cafes={cafes}
            onNavigate={setCurrentView}
          />
        );
      case "ads":
        return (
          <ReportAds 
            selectedCafe={selectedCafe}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            cafes={cafes}
          />
        );
      case "content":
        return (
          <ReportContent 
            selectedCafe={selectedCafe}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            cafes={cafes}
          />
        );
      case "cafes":
        return <CafeManagement cafes={cafes} />;
      default:
        return (
          <DashboardOverview 
            selectedCafe={selectedCafe}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            cafes={cafes}
            onNavigate={setCurrentView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader 
          selectedCafe={selectedCafe}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          cafes={cafes}
          onCafeChange={setSelectedCafe}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
        
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
