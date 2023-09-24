<template>
    <comp-aboutme/>
    <comp-skills/>
    <comp-edu/>
    <comp-projects/>
    <section class="print-btn">
        <a href="#" onclick="window.print();">Print this portfolio</a>
    </section>
</template>

<style>
.print-btn {
    padding: 1rem;
    text-align: right;
}

@media print {
    .print-btn {
        display: none;
    }
}
</style>