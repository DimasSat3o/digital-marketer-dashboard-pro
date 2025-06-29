
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardOverview } from "@/components/DashboardOverview";
import { ReportAds } from "@/components/ReportAds";
import { ReportContent } from "@/components/ReportContent";
import { CafeManagement } from "@/components/CafeManagement";
import { useCafes } from "@/hooks/useCafes";

const Index = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedCafe, setSelectedCafe] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { cafes, loading: cafesLoading } = useCafes();

  // Use first cafe as default if cafes are loaded
  const firstCafeId = cafes.length > 0 ? cafes[0].id : "";
  const effectiveSelectedCafe = selectedCafe === "1" && firstCafeId ? firstCafeId : selectedCafe;

  const renderContent = () => {
    if (cafesLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Memuat data...</div>
        </div>
      );
    }

    switch (currentView) {
      case "dashboard":
        return (
          <DashboardOverview 
            selectedCafe={effectiveSelectedCafe}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            cafes={cafes}
            onNavigate={setCurrentView}
          />
        );
      case "ads":
        return (
          <ReportAds 
            selectedCafe={effectiveSelectedCafe}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            cafes={cafes}
          />
        );
      case "content":
        return (
          <ReportContent 
            selectedCafe={effectiveSelectedCafe}
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
            selectedCafe={effectiveSelectedCafe}
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
          selectedCafe={effectiveSelectedCafe}
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
