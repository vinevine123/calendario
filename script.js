document.addEventListener('DOMContentLoaded', () => {
    const monthYearElem = document.getElementById('month-year');
    const calendarBodyElem = document.getElementById('calendar-body');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');
    const holidayNameElem = document.getElementById('holiday-name');
    const holidayDescriptionElem = document.getElementById('holiday-description');

    let currentDate = new Date();

    // Lista abrangente de datas comemorativas no Brasil
    const holidays = [
        { month: 0, day: 1, name: 'Ano Novo', description: 'Celebra o início do novo ano.' },
        { month: 1, day: 14, name: 'Valentine\'s Day', description: 'Dia dos namorados em muitos países.' },
        { month: 3, day: 21, name: 'Dia de Tiradentes', description: 'Feriado nacional no Brasil em homenagem a Joaquim José da Silva Xavier.' },
        { month: 4, day: 1, name: 'Dia do Trabalho', description: 'Comemora as conquistas dos trabalhadores.' },
        { month: 5, day: 12, name: 'Dia das Mães', description: 'Dia para homenagear as mães.' },
        { month: 6, day: 9, name: 'Dia dos Namorados', description: 'Celebra o amor e o romance.' },
        { month: 7, day: 20, name: 'Dia do Amigo', description: 'Celebra a amizade.' },
        { month: 8, day: 7, name: 'Independência do Brasil', description: 'Comemora a independência do Brasil.' },
        { month: 9, day: 12, name: 'Nossa Senhora Aparecida', description: 'Feriado religioso em homenagem à padroeira do Brasil.' },
        { month: 10, day: 2, name: 'Finados', description: 'Dia para lembrar e honrar os mortos.' },
        { month: 10, day: 15, name: 'Proclamação da República', description: 'Comemora a proclamação da República Brasileira.' },
        { month: 11, day: 1, name: 'Dia de Todos os Santos', description: 'Feriado católico que celebra todos os santos.' },
        { month: 11, day: 25, name: 'Natal', description: 'Celebra o nascimento de Jesus Cristo.' }
    ];

    function updateCalendarHeader(date) {
        const year = date.getFullYear();
        const month = date.toLocaleString('pt-BR', { month: 'long' });
        monthYearElem.textContent = `${month} ${year}`;
    }

    function generateDates(date) {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const dates = Array(firstDay.getDay()).fill('');
        for (let i = 1; i <= lastDay.getDate(); i++) {
            dates.push(i);
        }
        return dates;
    }

    function renderDates(dates) {
        calendarBodyElem.innerHTML = '';
        dates.forEach(day => {
            const dayElem = document.createElement('div');
            if (day) {
                const holiday = holidays.find(h => h.month === currentDate.getMonth() && h.day === day);
                dayElem.textContent = day;
                if (holiday) {
                    dayElem.classList.add('holiday');
                    dayElem.title = holiday.name;
                    dayElem.addEventListener('click', () => updateModal(holiday));
                }
            }
            calendarBodyElem.appendChild(dayElem);
        });
    }

    function updateModal(holiday) {
        holidayNameElem.textContent = holiday.name;
        holidayDescriptionElem.textContent = holiday.description;
        modal.style.display = 'flex';
    }

    function renderCalendar(date) {
        updateCalendarHeader(date);
        const dates = generateDates(date);
        renderDates(dates);
    }

    prevButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    renderCalendar(currentDate);
});
