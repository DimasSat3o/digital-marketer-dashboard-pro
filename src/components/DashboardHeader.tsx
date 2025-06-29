
import { Calendar, ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardHeaderProps {
  selectedCafe: string;
  selectedMonth: number;
  selectedYear: number;
  cafes: Array<{ id: string; name: string }>;
  onCafeChange: (cafe: string) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export const DashboardHeader = ({
  selectedCafe,
  selectedMonth,
  selectedYear,
  cafes,
  onCafeChange,
  onMonthChange,
  onYearChange,
}: DashboardHeaderProps) => {
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Digital Marketing</h2>
          <p className="text-gray-600 mt-1">Kelola laporan iklan dan konten untuk semua kafe</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-start sm:items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filter:</span>
          </div>

          <Select value={selectedCafe} onValueChange={onCafeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih Kafe" />
            </SelectTrigger>
            <SelectContent>
              {cafes.map((cafe) => (
                <SelectItem key={cafe.id} value={cafe.id}>
                  {cafe.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth.toString()} onValueChange={(value) => onMonthChange(parseInt(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear.toString()} onValueChange={(value) => onYearChange(parseInt(value))}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
};
